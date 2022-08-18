import React, { useState } from 'react';
import { Select } from 'antd';
import CityData from 'rowData/AddressData';

const { Option } = Select;

const cities = CityData.city;
const goos = CityData.goo;
const dongs = CityData.dong;

const CustomerAddress = ({ setAddress }) => {
  const [customer_addr, setCustomer_addr] = useState({
    city: cities[0].name,
    goo: undefined,
    dong: undefined,
  });
  const [goosList, setGoosList] = useState(goos[cities[0].key]);
  const [dongList, setDongList] = useState([]);

  const handleSetAddress = async () => {
    const { city, goo, dong } = customer_addr;
    if (city !== '' && goo !== '' && dong !== '') {
      await setAddress(`${city} ${goo} ${dong}`);
    }
  };

  const handleCityChange = (key, value) => {
    const { children } = value;
    setCustomer_addr({
      ...customer_addr,
      city: children,
      goo: goos[key][0].name,
      dong: null,
    });
    setGoosList(goos[key]);
  };

  const handeGooChange = (key, value) => {
    const { children } = value;
    setCustomer_addr({
      ...customer_addr,
      goo: children,
      dong: dongs[key][0].name,
    });
    setDongList(dongs[key]);
  };

  const handeDongChange = (key, value) => {
    const { children } = value;
    setCustomer_addr({ ...customer_addr, dong: children });
    handleSetAddress();
  };

  return (
    <>
      <Select
        defaultValue={cities[0].name}
        value={customer_addr.city}
        onChange={handleCityChange}
      >
        {cities.map(({ key, name }) => (
          <Option key={key}>{name}</Option>
        ))}
      </Select>
      <Select
        placeholder="구/군"
        value={customer_addr.goo}
        onChange={handeGooChange}
      >
        {goosList.map(({ key, name }) => (
          <Option key={key}>{name}</Option>
        ))}
      </Select>
      <Select
        placeholder="동/읍/면"
        value={customer_addr.dong}
        onChange={handeDongChange}
      >
        {dongList.map(({ key, name }) => (
          <Option key={key}>{name}</Option>
        ))}
      </Select>
    </>
  );
};

export default CustomerAddress;
