<b>Welcome to MeowNinjaJS wiki! (^_^)</b> <br>
<br>
1. Explaining <b><i>MeowBinary.js</b></i><br>
This file was coded in the 8:1 compression methodology, where it converts Base2 binary into Base10 decimal.<br>

    Meow_Output = This stores the integer value <br>
    Meow_PredictPosVal = This will hold the value of the current position automatically <br>
    Meow_Len = The size which has to be stored <br>
    Meow_Storage = Storing the Meow_Len in the form of boolean type. <br>
    Meow_Def4 = variable name <br>
    Meow_PredictVal (compression) = Converting the predicted value in the form of boolean gets converted into integer by compressing them. <br>
    Meow_Flag = This will hold the current integer <br><br>
<i>Only-Specific Line Explanation:</i>

    Line 3: Compression starts <br>
    Line 8: for-loop --- As the Meow_Len starts generating and gets stored in "Meow_Storage" as boolean <br>
    Line 10: for-loop works under if-loop. <br>
    Line 18: Meow_PredictVal is converted into integer. <br>
    Line 19: As Meow_PredictVal gets generated, the Meow_PredictPosVal gets increased. <br>
    Line 21: The final value is returned as integer and it's passed. <br>
    Line 23: Decompression phase begins. <br>
    Line 31: Getting the next flag one after the other <br>
    Line 32: Meow_Flag generation leading to conversion back to boolean <br>
    Line 40: As the flag gets generated, the results are stored one by one automatically.
    Line 41: Subtracting Meow_Flag from Meow_Integer
