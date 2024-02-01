const Table = require('cli-table3');

function removeCommasInBracketsAndBraces(inputString) {
    // Remove commas inside square brackets
    const step1 = inputString.replace(/\[([^\]]*)\]/g, function(match, p1) {
      return `[${p1.replace(/,/g, '')}]`;
    });
  
    // Remove commas inside curly braces
    const result = step1.replace(/\{([^}]*)\}/g, function(match, p1) {
      return `{${p1.replace(/,/g, '')}}`;
    });
  
    return result;
  }
  
  function printTabularCSV(csvString1) {
    // Split CSV string into rows
    const csvString = removeCommasInBracketsAndBraces(csvString1);
    const rows = csvString.split('\n');

    // Calculate column widths
    const columnWidths = rows.reduce((acc, row) => {
        const cells = row.split(',').map(cell => cell.replace(/"/g, ''));
        cells.forEach((cell, index) => {
            acc[index] = Math.max(acc[index] || 0, cell.length);
        });
        return acc;
    }, []);

    // Add data rows
    for (let i = 1; i < rows.length; i++) {
        const rowData = rows[i].split(',').map(cell => cell.replace(/"/g, ''));

        // Print each row
        for (let j = 0; j < rowData.length; j++) {
            const cellLines = rowData[j].split('\n');
            const maxCellWidth = columnWidths[j];

            for (const line of cellLines) {
                const wrappedLines = [];
                let remaining = line;

                while (remaining.length > maxCellWidth) {
                    wrappedLines.push(remaining.slice(0, maxCellWidth));
                    remaining = remaining.slice(maxCellWidth);
                }

                wrappedLines.push(remaining);
                console.log(wrappedLines.join('\n'));
            }

            if (j < rowData.length - 1) {
                console.log(' | '); // Add separator between cells
            }
        }

        console.log('\n'); // Add separator between rows
    }
}



module.exports = { printTabularCSV };