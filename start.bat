@echo off
chcp 65001 > nul
title token cleaner version 1.0 by molo
echo /!\ Merci de ne pas utiliser ce tool à des fins malveillantes
set token=

set /p token=Entrez le token à purifier : %=%
cls

node index "%token%"
pause