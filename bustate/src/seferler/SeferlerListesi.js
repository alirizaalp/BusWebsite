import React, { useState } from 'react';
import './SeferlerListesi.css';

function SeferlerListesi({ seferler }) {
  const [seciliSeferler, setSeciliSeferler] = useState([]);
  const [alınanBiletler, setAlınanBiletler] = useState([]);
  const [koltuklarGoster, setKoltuklarGoster] = useState(false);
  const [odemeBilgileri, setOdemeBilgileri] = useState({
    kartNo: '',
    sonKullanimTarihi: '',
    cvc: '',
  });
  const [odemeTamamlandi, setOdemeTamamlandi] = useState(false);
  const [odemeHatasi, setOdemeHatasi] = useState(false); // Yeni bir state ekleyin

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

  const handleOdemeBilgileriDegisiklik = (e) => {
    const { name, value } = e.target;
    setOdemeBilgileri({
      ...odemeBilgileri,
      [name]: value,
    });
  };

  const handleOdemeYap = () => {
    // Kart bilgileri eksikse ödeme hatası göster
    if (!odemeBilgileri.kartNo || !odemeBilgileri.sonKullanimTarihi || !odemeBilgileri.cvc) {
      setOdemeHatasi(true);
      return;
    }

    // Burada ödeme yapılabilir. Örnek olarak, konsola ödeme bilgilerini yazdıralım.
    console.log('Ödeme Bilgileri:', odemeBilgileri);

    // Ödeme tamamlandığında "odemeTamamlandi" state'ini güncelleyin
    setOdemeTamamlandi(true);
  };

  const renderKoltuklar = (biletSayisi) => {
    const koltuklar = [];
    for (let i = 0; i < biletSayisi; i++) {
      const koltukListesi = [...Array(15)].map((_, index) => (
        <div key={index} className="koltuk">
          Koltuk {index + 1}
        </div>
      ));
      koltuklar.push(
        <div key={i}>
          <h2>Koltuk Seçimi - Bilet {i + 1}</h2>
          <p>Lütfen koltuğunuzu seçin:</p>
          <div className="koltuklar-container">{koltukListesi}</div>
        </div>
      );
    }
    return koltuklar;
  };

  return (
    <div>
      <h1>Otobüs Sefer Listesi</h1>
      {koltuklarGoster ? (
        <div>
          <h2>Alınan Biletler</h2>
          <ul>
            {alınanBiletler.map((seferId, index) => {
              const seferDetay = seferler.find((sefer) => sefer.id === seferId);
              return (
                <li key={index}>
                  {seferDetay.guzergah} - {seferDetay.tarih} - {seferDetay.gun} - {seferDetay.saat} - {seferDetay.fiyat}
                </li>
              );
            })}
          </ul>
          {renderKoltuklar(alınanBiletler.length)}
          <h2>Ödeme Bilgileri</h2>
          <form>
            <label>Kart Numarası:</label>
            <input
              type="text"
              name="kartNo"
              value={odemeBilgileri.kartNo}
              onChange={handleOdemeBilgileriDegisiklik}
            />
            <label>Son Kullanma Tarihi:</label>
            <input
              type="text"
              name="sonKullanimTarihi"
              value={odemeBilgileri.sonKullanimTarihi}
              onChange={handleOdemeBilgileriDegisiklik}
            />
            <label>CVC:</label>
            <input
              type="text"
              name="cvc"
              value={odemeBilgileri.cvc}
              onChange={handleOdemeBilgileriDegisiklik}
            />
          </form>
          <button onClick={handleOdemeYap}>Ödeme Yap</button>
          {odemeHatasi && <p>Lütfen gerekli yerleri doldurun.</p>}
          {odemeTamamlandi && <p>Ödeme Başarıyla Tamamlandı!</p>}
        </div>
      ) : (
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
      )}
      <button onClick={handleBiletAl}>Bilet Al</button>
    </div>
  );
}

export default SeferlerListesi;
