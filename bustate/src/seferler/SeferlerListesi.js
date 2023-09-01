import React, { useState } from 'react';

function SeferlerListesi({ seferler }) {
  const [seciliSeferler, setSeciliSeferler] = useState([]);
  const [alınanBiletler, setAlınanBiletler] = useState([]);
  const [koltuklarGoster, setKoltuklarGoster] = useState(false); // Koltukları göstermek için bir state

  const toggleSefer = (seferId) => {
    if (seciliSeferler.includes(seferId)) {
      setSeciliSeferler(seciliSeferler.filter((id) => id !== seferId));
    } else {
      setSeciliSeferler([...seciliSeferler, seferId]);
    }
  };

  const handleBiletAl = () => {
    // Alınan biletlerin yanı sıra seçilen koltukları da ekleyin
    const yeniBiletler = [...alınanBiletler, ...seciliSeferler];
    setAlınanBiletler(yeniBiletler);
    setSeciliSeferler([]);
    setKoltuklarGoster(true); // Bilet alındığında koltukları göster
  };

  // Her bir bilet için 15 koltuk oluşturun
  const koltuklar = (biletSayisi) => {
    const koltukListesi = [];
    for (let i = 0; i < biletSayisi; i++) {
      const koltuklar = [...Array(15)].map((_, index) => (
        <div key={index} className="koltuk">
          Koltuk {index + 1}
        </div>
      ));
      koltukListesi.push(
        <div key={i}>
          <h2>Koltuk Seçimi - Bilet {i + 1}</h2>
          <p>Lütfen koltuğunuzu seçin:</p>
          <div className="koltuklar-container">{koltuklar}</div>
        </div>
      );
    }
    return koltukListesi;
  };

  return (
    <div>
      <h1>Otobüs Sefer Listesi</h1>
      <ul>
        {seferler.map((sefer) => (
          <li key={sefer.id}>
            <input
              type="checkbox"
              checked={seciliSeferler.includes(sefer.id)}
              onChange={() => toggleSefer(sefer.id)}
            />
            <strong>Güzergah:</strong> {sefer.guzergah}
            <br />
            <strong>Tarih:</strong> {sefer.tarih}
            <br />
            <strong>Gün:</strong> {sefer.gun}
            <br />
            <strong>Saat:</strong> {sefer.saat}
            <br />
            <strong>Fiyat:</strong> {sefer.fiyat} 
          </li>
        ))}
      </ul>
      <button onClick={handleBiletAl}>Bilet Al</button>
      {koltuklarGoster && (
        <div>
          <h2>Alınan Biletler</h2>
          <ul>
            {alınanBiletler.map((seferId, index) => (
              <li key={seferId}>
                {seferler.find((sefer) => sefer.id === seferId).guzergah} -{' '}
                {seferler.find((sefer) => sefer.id === seferId).tarih} -{' '}
                {seferler.find((sefer) => sefer.id === seferId).gun} -{' '}
                {seferler.find((sefer) => sefer.id === seferId).saat} -{' '}
                {seferler.find((sefer) => sefer.id === seferId).fiyat}
              </li>
            ))}
          </ul>
          {koltuklar(alınanBiletler.length)}
        </div>
      )}
    </div>
  );
}

export default SeferlerListesi;




