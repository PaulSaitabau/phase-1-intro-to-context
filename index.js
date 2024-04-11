// Your code here
// This function creates a single employee record from a given row of data.
let createEmployeeRecord = function(row) {
    return {
        firstName: row[0], 
        familyName: row[1], 
        title: row[2], 
        payPerHour: row[3], 
        timeInEvents: [], 
        timeOutEvents: [] 
    }
}

// This function creates multiple employee records from an array of rows.
let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row) 
    })
}

// This function adds a time-in event to an employee's record.
let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ') 

    employee.timeInEvents.push({ 
        type: "TimeIn",
        hour: parseInt(hour, 10), 
        date,
    })

    return employee // Return the updated employee record
}

// This function adds a time-out event to an employee's record.
let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ') 

    employee.timeOutEvents.push({ 
        type: "TimeOut",
        hour: parseInt(hour, 10), 
        date,
    })

    return employee // Return the updated employee record
}

// This function calculates the number of hours worked on a specific date.
let hoursWorkedOnDate = function(employee, soughtDate) {
    let inEvent = employee.timeInEvents.find(function(e) {
        return e.date === soughtDate 
    })

    let outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === soughtDate 
    })

    return (outEvent.hour - inEvent.hour) / 100 
}

// This function calculates the wage earned on a specific date.
let wagesEarnedOnDate = function(employee, dateSought) {
    let rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour 
    return parseFloat(rawWage.toString()) 
}

// This function calculates the total wages earned by an employee.
let allWagesFor = function(employee) {
    let eligibleDates = employee.timeInEvents.map(function(e) {
        return e.date 
    })

    let payable = eligibleDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d) // Calculate the total wages
    }, 0)

    return payable
}

// This function finds an employee by their first name.
let findEmployeeByFirstName = function(srcArray, firstName) {
 return srcArray.find(function(rec) {
    return rec.firstName === firstName 
 })
}

// This function calculates the total payroll for all employees.
let calculatePayroll = function(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor(rec) 
    }, 0)
}
