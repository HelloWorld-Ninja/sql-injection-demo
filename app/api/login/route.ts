import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

// Create a reusable MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
  }

  try {

    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log(query)
    const [rows] = await pool.query(query);
    
    // const [rows] = await pool.execute(
    //   'SELECT * FROM users WHERE username = ? AND password = ?',
    //   [username, password]
    // );

    const users = rows as { id: number; username: string; password: string }[];

    if (users.length === 0) {
      // User not found
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const user = users[0];

    // Login successful
    return NextResponse.json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}