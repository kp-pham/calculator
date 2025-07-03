# calculator

```mermaid
<<<<<<< HEAD
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

=======
---
title: Calculator as Finite State Machine
---
stateDiagram-v2

  direction LR
  Left: Enter left operand
  Operation: Enter operation
  Right: Enter right operand
  Perform: Perform operation
  Error: Error from calculation

  Left --> Operation: Operator
  Left --> Perform: Equal Sign
  Left --> Left: Digit, Clear
  
  Operation --> Right: Digit
  Operation --> Left: Clear
  Operation --> Operation: Operator
  Operation --> Perform: Equal Sign

  Right --> Perform: Equal Sign, Operator
  Right --> Left: Clear
  Right --> Right: Digit

  Perform --> Left: Digit, Clear
  Perform --> Right: Operator
  Perform --> Perform: Equal Sign
  Perform --> Error: Divide by Zero

  Error --> Left: Digit, Clear, Equal Sign
>>>>>>> 77dd4c22367b20fa459b8f82997c12625ed897ab
```