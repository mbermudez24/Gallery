@echo off
setlocal enabledelayedexpansion

set "prefix=italy"

set "counter=1"
for %%F in (*.jpg *.png *.gif *.bmp) do (
    set "newName=!prefix!!counter!%%~xF"g
    ren "%%F" "!newName!"
    set /a "counter+=1"
)

endlocal
