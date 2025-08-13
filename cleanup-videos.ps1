# Cleanup script to remove large video files after replacing with YouTube links
Write-Host "Cleaning up large video files..." -ForegroundColor Green

# List of large video files to remove (excluding SRR.mp4 and carousel_video_1_hq_merged.mp4)
$filesToRemove = @(
    "public/media/video2.mp4",           # 177.92MB
    "public/media/video1.mp4",           # 161.01MB
    "public/media/carousel_video_2_hq_merged.mp4",  # 76.11MB
    "public/media/carousel_video_5_hq_merged.mp4",  # 62.09MB
    "public/media/temp_video_1.f137.mp4", # 43.6MB
    "public/media/carousel_video_4_hq_merged.mp4",  # 27.58MB
    "public/media/hero_video_2.mp4",     # 13.83MB
    "public/media/temp_video_3.f136.mp4", # 12.62MB
    "public/media/hero_video_1.mp4",     # 8.58MB
    "public/media/hero_video_3.mp4",     # 5.21MB
    "public/media/carousel_video_3_hq_merged.mp4"   # 14.63MB
)

# Files to keep (for reference)
$filesToKeep = @(
    "public/media/SRR.mp4",              # 25.55MB - KEEPING THIS
    "public/media/carousel_video_1_hq_merged.mp4"   # 45.43MB - KEEPING THIS
)

Write-Host "Files to be removed:" -ForegroundColor Yellow
foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length / 1MB
        Write-Host "   - $file ($([math]::Round($size,2))MB)" -ForegroundColor Red
    }
}

Write-Host "Files to keep:" -ForegroundColor Green
foreach ($file in $filesToKeep) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length / 1MB
        Write-Host "   + $file ($([math]::Round($size,2))MB)" -ForegroundColor Green
    }
}

Write-Host ""
$totalSizeRemoved = 0
$filesRemoved = 0

foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length / 1MB
        $totalSizeRemoved += $size
        $filesRemoved++
        
        Write-Host "Removing: $file ($([math]::Round($size,2))MB)" -ForegroundColor Yellow
        Remove-Item $file -Force
        Write-Host "Removed: $file" -ForegroundColor Green
    } else {
        Write-Host "File not found: $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Cleanup Complete!" -ForegroundColor Green
Write-Host "Files removed: $filesRemoved" -ForegroundColor Cyan
Write-Host "Total size removed: $([math]::Round($totalSizeRemoved,2))MB" -ForegroundColor Cyan
Write-Host "Your project is now ready for free deployment!" -ForegroundColor Green

# Check remaining project size
$remainingSize = (Get-ChildItem -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "Remaining project size: $([math]::Round($remainingSize,2))MB" -ForegroundColor Cyan 