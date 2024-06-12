import React, { useState } from 'react';
import { Button, Textarea, Avatar, Box, Flex } from '@chakra-ui/react';
import { FaUser, FaTimes } from 'react-icons/fa';

const YorumYapma = ({ onYorumSubmit }) => {
    const [yorumlar, setYorumlar] = useState([]);
    const [yorum, setYorum] = useState('');

    const handleYorumChange = (event) => {
        setYorum(event.target.value);
    };

    const handleSubmit = () => {
        onYorumSubmit(yorum);
        setYorum('');
    };

    const handleYorumSil = (index) => {
        const yeniYorumlar = [...yorumlar];
        yeniYorumlar.splice(index, 1);
        setYorumlar(yeniYorumlar);
    };

    return (
        <div>
           
            <Flex alignItems="flex-start" mt={4}>
                <Avatar icon={<FaUser />} mr={2} />
                <Box flex="1">
                    <Flex justifyContent="space-between" alignItems="center">
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
                    </Flex>
                </Box>
            </Flex>
            {yorumlar.map((yorum, index) => (
    <Flex key={index} alignItems="center" position="relative">
        <Avatar icon={<FaUser />} mr={2} />
        <Box flex="1">
            <Box>{yorum}</Box>
            <Button onClick={() => handleYorumSil(index)} variant="outline" colorScheme="red" size="sm" position="absolute" top={0} right={0}>
                <FaTimes />
            </Button>
        </Box>
    </Flex>
))}

        </div>
    );
};

export default YorumYapma;