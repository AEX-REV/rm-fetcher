const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.join(__dirname, 'public', 'data.csv');

const config = {
  host: process.env.MYSQL_HOST || 'aex-nzj9k-mysql.external.kinsta.app',
  port: process.env.MYSQL_PORT || 30096,
  user: process.env.MYSQL_USER || 'mse',
  password: process.env.MYSQL_PASSWORD || 'Trendserv1!',
  database: process.env.MYSQL_DB || 'AEX'
};

const SQL = `
  SELECT 
    BookingDate,
    FlightDate,
    str_Fare_Class_Short,
    str_Flight_Nmbrs,
    TotalChargeAmount
  FROM Amelia_Detailed_Sales_Report
  WHERE str_Flight_Nmbrs IS NOT NULL
  AND TotalChargeAmount > 0
`;

async function run() {
  try {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute(SQL);
    await conn.end();

    const headers = Object.keys(rows[0]).join(',') + "\n";
    const lines = rows.map(r =>
      Object.values(r).map(v => typeof v === 'string' ? v.replace(/,/g, '') : v).join(',')
    ).join("\n");

    fs.writeFileSync(OUTPUT_PATH, headers + lines);
    console.log("✅ Data gemt i public/data.csv");
  } catch (err) {
    console.error("🚫 Fejl:", err);
    process.exit(1);
  }
}

run();