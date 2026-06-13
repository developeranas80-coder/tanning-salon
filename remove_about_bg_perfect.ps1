Add-Type -AssemblyName System.Drawing

# 1. Fresh copy of the correct original salon image
$srcPath = "C:\Users\zakir\.gemini\antigravity-ide\brain\da602685-7015-47fa-bc30-a97b870dc9c2\luxury_salon_about_1780054957468.png"
$destPath = "c:\Users\zakir\Desktop\beach-2 - Copy\public\about_salon.png"

if (-not (Test-Path $srcPath)) {
    Write-Host "Source file not found: $srcPath"
    exit
}

Copy-Item -Path $srcPath -Destination $destPath -Force
Write-Host "Copied fresh original image to: $destPath"

# 2. Open the fresh image and apply clean low-range GDI+ ColorKeying (150 to 255)
$srcBmp = New-Object System.Drawing.Bitmap($destPath)
$width = $srcBmp.Width
$height = $srcBmp.Height

$destBmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($destBmp)

# Wipes out all white/grey tones and highlights cleanly from RGB 150 up to 255
$attributes = New-Object System.Drawing.Imaging.ImageAttributes
$colorLow = [System.Drawing.Color]::FromArgb(150, 150, 150)
$colorHigh = [System.Drawing.Color]::FromArgb(255, 255, 255)
$attributes.SetColorKey($colorLow, $colorHigh)

$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$g.DrawImage($srcBmp, $rect, 0, 0, $width, $height, [System.Drawing.GraphicsUnit]::Pixel, $attributes)

# Clean up resources
$g.Dispose()
$srcBmp.Dispose()

# Save final clean transparent PNG
$tempPath = $destPath + ".tmp.png"
$destBmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
$destBmp.Dispose()

Move-Item -Path $tempPath -Destination $destPath -Force
Write-Host "Successfully generated perfect transparent about image!"
