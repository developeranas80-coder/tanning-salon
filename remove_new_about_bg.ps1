Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\zakir\.gemini\antigravity-ide\brain\da602685-7015-47fa-bc30-a97b870dc9c2\new_salon_about_1780067211146.png"
$destPath = "c:\Users\zakir\Desktop\beach-2 - Copy\public\about_salon.png"

if (-not (Test-Path $srcPath)) {
    Write-Host "Source file not found: $srcPath"
    exit
}

Write-Host "Processing New Salon Image: $srcPath"

# Load new original image
$srcBmp = New-Object System.Drawing.Bitmap($srcPath)
$width = $srcBmp.Width
$height = $srcBmp.Height

# Create transparent bitmap
$destBmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($destBmp)

# Set ColorKey attributes to treat all white/light background colors (160 to 255) as transparent
$attributes = New-Object System.Drawing.Imaging.ImageAttributes
$colorLow = [System.Drawing.Color]::FromArgb(160, 160, 160)
$colorHigh = [System.Drawing.Color]::FromArgb(255, 255, 255)
$attributes.SetColorKey($colorLow, $colorHigh)

$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$g.DrawImage($srcBmp, $rect, 0, 0, $width, $height, [System.Drawing.GraphicsUnit]::Pixel, $attributes)

# Dispose resources
$g.Dispose()
$srcBmp.Dispose()

# Save final transparent PNG to about_salon.png
$tempPath = $destPath + ".tmp.png"
$destBmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
$destBmp.Dispose()

Move-Item -Path $tempPath -Destination $destPath -Force
Write-Host "Successfully generated transparent cutout for new salon image at: $destPath"
