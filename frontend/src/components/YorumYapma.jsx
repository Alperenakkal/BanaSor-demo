import React, { useState } from 'react';
import { Button, Textarea } from '@chakra-ui/react';

const YorumYapma = ({ onYorumSubmit }) => {
    const [yorum, setYorum] = useState('');

    const handleYorumChange = (event) => {
        setYorum(event.target.value);
    };

    const handleSubmit = () => {
        // Yorumun backend'e gönderilmesi burada gerçekleştirilebilir
        // Örneğin: fetch() kullanarak API'ye POST isteği göndermek
        // Ardından onYorumSubmit callback'i çağrılır
        onYorumSubmit(yorum);
        // Yorum alanını temizle
        setYorum('');
    };

    return (
        <div>
            <Textarea
                value={yorum}
                onChange={handleYorumChange}
                placeholder="Yorumunuzu buraya girin..."
                size="sm"
                resize="none"
                mb={2}
            />
            <Button onClick={handleSubmit} colorScheme="blue" size="sm">
                Yorum Yap
            </Button>
        </div>
    );
};

export default YorumYapma;