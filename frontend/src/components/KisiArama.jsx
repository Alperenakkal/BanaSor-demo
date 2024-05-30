import React, { useState } from 'react';

// Örnek kullanıcı verileri
const users = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', avatar: 'https://bit.ly/dan-abramov' },
  { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', avatar: 'https://bit.ly/tioluwani-kolawole' },
  { id: 3, name: 'Mehmet Kara', email: 'mehmet@example.com', avatar: 'https://bit.ly/kent-c-dodds' },
  { id: 4, name: 'Fatma Çelik', email: 'fatma@example.com', avatar: 'https://bit.ly/ryan-florence' },
];

function KisiArama() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const handleSearch = () => {
        const result = users.find(user =>
            user.name.toLowerCase() === searchTerm.toLowerCase()
        );
        setSearchResult(result);
    };

    return (
        <div>
            <h1>Kişi Arama</h1>
            <label htmlFor="search">İsim:</label>
            <input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch}>Ara</button>

            {searchResult ? (
                <div className="profile">
                    <img src={searchResult.avatar} alt={searchResult.name} />
                    <h2>{searchResult.name}</h2>
                    <p>{searchResult.email}</p>
                </div>
            ) : (
                <p>Kullanıcı bulunamadı.</p>
            )}
        </div>
    );
}

export default KisiArama;