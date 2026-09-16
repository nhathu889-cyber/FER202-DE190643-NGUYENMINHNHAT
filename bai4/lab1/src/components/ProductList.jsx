import React from 'react';
import ProductInfo from './ProductInfo';

function ProductList() {
  const products = [
    {
      name: "Pizza Hải Sản Phô Mai",
      price: "150.000 đ",
      description: "Đế bánh giòn rụm phủ đầy tôm, mực tươi ngon kết hợp sốt cà chua đặc biệt.",
      tags: "Best Seller",
      avatar: "/images/image1.png"
    },
    {
      name: "Pizza Bò bằm Phô Mai",
      price: "130.000 đ",
      description: "Thịt bò băm thơm lừng đậm đà cùng lớp phô mai mozzarella kéo sợi béo ngậy.",
      tags: "New",
      avatar: "/images/image2.png"
    }
  ];

  return (
    <div style={{ padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '25px' }}>Danh Sách Sản Phẩm Pizza</h1>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {products.map((item, index) => (
          <ProductInfo 
            key={index}
            name={item.name}
            price={item.price}
            description={item.description}
            tags={item.tags}
            avatar={item.avatar}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;