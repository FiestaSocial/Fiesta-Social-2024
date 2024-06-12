const express = require('express');
const xlsx = require('xlsx');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // Para servir archivos estáticos, como tu HTML y CSS

app.get('/api/invitados', (req, res) => {
    const workbook = xlsx.readFile('Datos de Invitados.xlsx');
    const sheet_name_list = workbook.SheetNames;
    const invitados = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    res.json(invitados);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
