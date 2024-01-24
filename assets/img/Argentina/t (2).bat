@echo off
setlocal enabledelayedexpansion

echo { "imagenes": [ > index.json

set first=1
for %%f in (*.jpg) do (
    if !first! == 1 (
        echo    "%%~nf.jpg" >> index.json
        set "first=0"
    ) else (
        echo    ,"%%~nf.jpg" >> index.json
    )
)

echo ] } >> index.json
