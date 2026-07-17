/**
 * Vehicle Rental System API — Vercel Serverless Function
 * In-memory storage (resets on cold start).
 * Frontend falls back to localStorage if API is unavailable.
 */

let vehicles = null;
let history = null;

function seedData() {
    vehicles = [
        { plateNumber: 'KHI-1001', model: 'Toyota Corolla', type: 'Car', baseRatePerDay: 5000, isRented: false, extraLoadFee: 0 },
        { plateNumber: 'KHI-1002', model: 'Honda Civic', type: 'Car', baseRatePerDay: 6000, isRented: false, extraLoadFee: 0 },
        { plateNumber: 'KHI-1003', model: 'Suzuki Alto', type: 'Car', baseRatePerDay: 3000, isRented: false, extraLoadFee: 0 },
        { plateNumber: 'LHR-2001', model: 'Honda CD-70', type: 'Bike', baseRatePerDay: 1200, isRented: false, extraLoadFee: 0 },
        { plateNumber: 'LHR-2002', model: 'Yamaha YBR 125', type: 'Bike', baseRatePerDay: 1800, isRented: false, extraLoadFee: 0 },
        { plateNumber: 'LHR-2003', model: 'Honda CB 150', type: 'Bike', baseRatePerDay: 2200, isRented: false, extraLoadFee: 0 },
        { plateNumber: 'ISB-3001', model: 'Hino Ranger', type: 'Truck', baseRatePerDay: 8000, isRented: false, extraLoadFee: 1500 },
        { plateNumber: 'ISB-3002', model: 'Mazda Titan', type: 'Truck', baseRatePerDay: 7500, isRented: false, extraLoadFee: 1200 },
        { plateNumber: 'ISB-3003', model: 'Isuzu NPR', type: 'Truck', baseRatePerDay: 9000, isRented: false, extraLoadFee: 2000 },
        { plateNumber: 'PEW-1004', model: 'Toyota Fortuner', type: 'Car', baseRatePerDay: 8000, isRented: false, extraLoadFee: 0 },
    ];
    history = [];
}

function json(res, status, data) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function readBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', c => { body += c; });
        req.on('end', () => {
            try { resolve(JSON.parse(body || '{}')); }
            catch { resolve({}); }
        });
    });
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (!vehicles) seedData();

    const url = req.url || '';

    try {
        if (req.method === 'GET' && url === '/api/vehicles') {
            return json(res, 200, { vehicles, history });
        }

        if (req.method === 'POST' && url === '/api/vehicles') {
            const body = await readBody(req);
            if (Array.isArray(body.vehicles)) vehicles = body.vehicles;
            if (Array.isArray(body.history)) history = body.history;
            return json(res, 200, { success: true });
        }

        return json(res, 404, { error: 'Not found.' });

    } catch (err) {
        console.error('API Error:', err);
        return json(res, 500, { error: 'Internal server error.' });
    }
};
