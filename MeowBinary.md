Explaining <b><i>MeowBinary.js</b></i><br>
This file was coded in the 8:1 compression methodology, where it converts Base2 binary into Base10 decimal.<br>

    Meow_Output = This stores the integer value
    Meow_PredictPosVal = This will hold the value of the current position automatically
    Meow_Len = The size which has to be stored
    Meow_Storage = Storing the Meow_Len in the form of boolean type.
    m = variable name
    Meow_PredictVal (compression) = Converting the predicted value in the form of boolean gets converted into integer by compressing them.
    Meow_Flag = This will hold the current integer 
    
<i>Only-Specific Line Explanation:</i>

    Line 3: Compression starts 
    Line 7: for-loop --- As the Meow_Len starts generating and gets stored in "Meow_Storage" as boolean 
    Line 8: for-loop works under if-loop. 
    Line 13: Meow_PredictVal is converted into integer. 
    Line 14: As Meow_PredictVal gets generated, the Meow_PredictPosVal gets increased.
    Line 16: The final value is returned as integer and it's passed. 
    Line 18: Decompression phase begins. 
    Line 23: Getting the next flag one after the other 
    Line 24: Meow_Flag generation leading to conversion back to boolean 
    Line 30: As the flag gets generated, the results are stored one by one automatically.
    Line 31: Subtracting Meow_Flag from Meow_Integer
