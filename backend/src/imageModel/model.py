import torch
from torch import nn

class ResBlock(nn.Module):
    def __init__(self, ch):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(ch, ch, 3, 1, 1),
            nn.BatchNorm2d(ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(ch, ch, 3, 1, 1),
            nn.BatchNorm2d(ch),
        )
        self.relu = nn.ReLU(inplace=True)
 
    def forward(self, x):
        return self.relu(x + self.net(x))
 
 
class DownBlock(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, 1, 1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            ResBlock(out_ch),
        )
        self.pool = nn.MaxPool2d(2)
 
    def forward(self, x):
        skip = self.net(x)
        return self.pool(skip), skip
 
 
class UpBlock(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.up  = nn.ConvTranspose2d(in_ch, out_ch, 2, 2)
        self.net = nn.Sequential(
            nn.Conv2d(out_ch * 2, out_ch, 3, 1, 1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            ResBlock(out_ch),
        )
 
    def forward(self, x, skip):
        x = self.up(x)
        x = torch.cat([x, skip], dim=1)
        return self.net(x)
 
 
class Model(nn.Module):
    def __init__(self):
        super().__init__()
        self.enc1 = DownBlock(3,   64)
        self.enc2 = DownBlock(64,  128)
        self.enc3 = DownBlock(128, 256)
        self.enc4 = DownBlock(256, 512)
 
        self.bottleneck = nn.Sequential(
            nn.Conv2d(512, 1024, 3, 1, 1),
            nn.BatchNorm2d(1024),
            nn.ReLU(inplace=True),
            ResBlock(1024),
            ResBlock(1024),
        )
 
        self.dec4 = UpBlock(1024, 512)
        self.dec3 = UpBlock(512,  256)
        self.dec2 = UpBlock(256,  128)
        self.dec1 = UpBlock(128,   64)
 
        self.out_conv = nn.Sequential(
            nn.Conv2d(64, 32, 3, 1, 1),
            nn.ReLU(inplace=True),
            nn.Conv2d(32, 3, 1),
            nn.Sigmoid(),
        )
 
    def forward(self, x, target=None):
        x, s1 = self.enc1(x)
        x, s2 = self.enc2(x)
        x, s3 = self.enc3(x)
        x, s4 = self.enc4(x)
        x = self.bottleneck(x)
        x = self.dec4(x, s4)
        x = self.dec3(x, s3)
        x = self.dec2(x, s2)
        x = self.dec1(x, s1)
        return self.out_conv(x), None
