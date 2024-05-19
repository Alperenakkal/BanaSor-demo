import React from 'react'

export const TimeCal = (baslangicTarihi) => {
    const simdi = new Date();
    const gecmisZaman = new Date(baslangicTarihi);
    let fark = simdi - gecmisZaman; // Milisaniye cinsinden
  
    // Farkı sırasıyla gün, saat ve dakikaya çevir
    const gunFarki = Math.floor(fark / (1000 * 60 * 60 * 24));
    fark -= gunFarki * (1000 * 60 * 60 * 24);
  
    const saatFarki = Math.floor(fark / (1000 * 60 * 60));
    fark -= saatFarki * (1000 * 60 * 60);
  
    const dakikaFarki = Math.floor(fark / (1000 * 60));
  
    // En uygun birimi döndür
    if (gunFarki > 0) {
      return `${gunFarki} gün`;
    } else if (saatFarki > 0) {
      return `${saatFarki} saat`;
    } else {
      return `${dakikaFarki} dakika`;
    }
}

