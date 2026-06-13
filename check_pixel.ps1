Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\zakir\.gemini\antigravity-ide\brain\da602685-7015-47fa-bc30-a97b870dc9c2\luxury_salon_about_1780054957468.png"
if (Test-Path $filePath) {
    $bmp = New-Object System.Drawing.Bitmap($filePath)
    $pixel1 = $bmp.GetPixel(0, 0)
    $pixel2 = $bmp.GetPixel(10, 10)
    $pixel3 = $bmp.GetPixel($bmp.Width - 1, 0)
    Write-Host "Corner Top-Left:  RGB($($pixel1.R), $($pixel1.G), $($pixel1.B))"
    Write-Host "Corner Offset:    RGB($($pixel2.R), $($pixel2.G), $($pixel2.B))"
    Write-Host "Corner Top-Right: RGB($($pixel3.R), $($pixel3.G), $($pixel3.B))"
    $bmp.Dispose()
} else {
    Write-Host "File not found: $filePath"
}
