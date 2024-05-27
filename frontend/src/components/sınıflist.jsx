import { Button } from "@chakra-ui/button";
import { Card, CardBody } from "@chakra-ui/card";
import { Box, Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";

const SinifListesi = () => {
  const [siniflar, setSiniflar] = useState([]);
  const [aktifSinif, setAktifSinif] = useState(null);

  useEffect(() => {
    fetch("/siniflar.json")
      .then((response) => response.json())
      .then((veri) => setSiniflar(veri)); // sadece sınıf kategorileri
  }, []);

  const sinifaTikla = (sinifAdi) => {
    setAktifSinif((oncekiSinif) =>
      oncekiSinif === sinifAdi ? null : sinifAdi
    );
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      {siniflar.map((sinif) => (
        <Card key={sinif.className} width="140px" mb="2">
          <CardBody>
            <Flex mb="2px" alignItems="center" justifyContent="center">
              <Button
                variant="link"
                fontSize="17px"
                fontWeight="bold"
                color={aktifSinif === sinif ? "teal" : "black"}
                _hover={{ textDecoration: "none" }}
                _active={{ textDecoration: "none" }}
                onClick={() => sinifaTikla(sinif)}
                px={1} // Düğme yatay dolgusunu azalttım
                py={0} // Düğme dikey dolgusunu kaldırdım
              >
                {sinif.className}
              </Button>
            </Flex>
            {aktifSinif === sinif && (
              <Box dir="column">
                {sinif.classNames &&
                  sinif.classNames.map((sinifAdi, index) => (
                    <Button
                      key={index}
                      variant="link"
                      fontSize="16px"
                      color={aktifSinif === sinifAdi ? "teal" : "black"}
                      _hover={{ textDecoration: "none" }}
                      _active={{ textDecoration: "none" }}
                      mb="2"
                      onClick={() => sinifaTikla(sinifAdi)}
                    >
                      {sinifAdi}
                    </Button>
                  ))}
              </Box>
            )}
          </CardBody>
        </Card>
      ))}
    </Flex>
  );
};

export default SinifListesi;