import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <h1><Link to="/">BookHub</Link></h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/books/new" className="btn">Add Book</Link>
        </nav>
      </div>
    </header>
  );
}
