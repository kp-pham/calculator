# calculator

The capstone project of the Foundations course is a calculator with basic operations. The calculator performs simple addition, subtraction, multiplication, and division between positive and negative numbers and decimal values. The calculator takes input from the buttons on the keypad and from the keyboard and stores the numbers and operators entered to perform the calculation. The display of the calaculator is updated with the result of the calculation.

This project submission is based on the standard mode of the Windows Calculator for Windows 11 with the design and functionality, keyboard shortcuts, and implementation of operations based on the actual application software. Modifications and simplifications to the implementation of calculator were made to align with the scope of the project.

## Keyboard Shortcuts
*For more information about keyboard shortcuts for the Windows Calculator for Windows 11, click [here](https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-apps-139014e7-177b-d1f3-eb2e-7298b2599a34#bkmk_cal).*

|        |        |
| --- | --- |
| `Delete` | Clear entry (CE) |
| `Esc` | Clear (C) |
| `Backspace` | Delete previous character |
| `Shift` + `+` | Addition
| `-` | Subtraction
| `Shift` + `*` | Multiplication
| `/` | Division
| `Enter` or `=` | Perform calculation
| `Fn` + `F9` | Negate number
| `.` | Convert to decimal

## Calculator as Finite State Machine

*For more information about finite state machines, click [here](https://en.wikipedia.org/wiki/Finite-state_machine).* <br>
*For more information about state diagrams, click [here](https://en.wikipedia.org/wiki/State_diagram).*


```mermaid
stateDiagram-v2

  direction LR
  [*] --> Operand

  Operand: Enter Operand
  state Operand {
    Integer: Positive Integer
    NegativeInteger: Negative Integer
    Decimal: Positive decimal    
    NegativeDecimal: Negative Decimal

    [*] --> Integer
    [*] --> Decimal
    [*] --> NegativeInteger
    [*] --> NegativeDecimal

    Integer --> Decimal
    Integer --> NegativeDecimal
    Integer --> NegativeInteger

    Decimal --> Integer
    Decimal --> NegativeDecimal

    NegativeInteger --> NegativeDecimal
    NegativeInteger --> Integer

    NegativeDecimal --> NegativeInteger
    NegativeDecimal --> Decimal

    Integer --> [*]
    Decimal --> [*]
    NegativeInteger --> [*]
    NegativeDecimal --> [*]
  }

  Operand --> Operator

  Operator: Enter Operator
  state Operator {

    [*] --> Addition
    Addition --> Subtraction
    Addition --> Multiplication
    Addition --> Division

    [*] --> Subtraction
    Subtraction --> Addition
    Subtraction --> Multiplication
    Subtraction --> Division

    [*] --> Multiplication
    Multiplication --> Addition
    Multiplication --> Subtraction
    Multiplication --> Division

    [*] --> Division
    Division --> Addition
    Division --> Subtraction
    Division --> Multiplication

    Addition --> [*]
    Subtraction --> [*]
    Multiplication --> [*]
    Division --> [*]
  }

  Operator --> Operand
  Operand --> Perform

  Perform: Perform Operation
  state Perform {
    IntegerResult: Integer result
    DecimalResult: Decimal result
    DivideByZero: Divide By Zero Error
    Truncate: Truncate decimal
    Display: Display result 
    SciNotation: Scientific ntoation

    [*] --> IntegerResult
    [*] --> DecimalResult
    [*] --> DivideByZero

    IntegerResult --> Display
    DecimalResult --> Display

    IntegerResult --> SciNotation
    DecimalResult --> SciNotation
    SciNotation --> Display
    SciNotation --> Display

    DecimalResult --> Truncate
    Truncate --> Display

    Display --> [*]
    DivideByZero --> [*]
  }

  Perform --> Operand
  Perform --> Error

  state Error {
    Disable: Disable operators
    Message: Error message

    [*] --> Disable
    Disable --> Message
    Message --> [*]
  }

  Error --> Operand
```