import React from 'react';

function ProductInfo({ name, price, description, tags, avatar }) {
  return (
    <div style={{ 
      border: '1px solid #e0e0e0', 
      padding: '16px', 
      borderRadius: '12px', 
      width: '280px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'left'
    }}>
      {/* Khung chứa ảnh giúp hiển thị full và đẹp mắt hơn */}
      {avatar && (
        <div style={{ 
          width: '100%', 
          height: '180px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px', 
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px'
        }}>
          <img 
            src={avatar} 
            alt={name} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain' // Giúp hiển thị trọn vẹn toàn bộ hình chiếc bánh mà không bị mất viền
            }} 
          />
        </div>
      )}
      
      {/* Tên sản phẩm */}
      <h2 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#333' }}>{name}</h2>
      
      {/* Giá tiền */}
      <p style={{ color: '#d9534f', fontWeight: 'bold', fontSize: '16px', margin: '0 0 8px 0' }}>{price}</p>
      
      {/* Mô tả chi tiết */}
      {description && <p style={{ fontSize: '14px', color: '#666', margin: '0 0 12px 0', lineHeight: '1.4' }}>{description}</p>}
      
      {/* Thẻ tag */}
      {tags && (
        <span style={{ 
          background: '#f0f0f0', 
          color: '#333', 
          padding: '4px 10px', 
          borderRadius: '4px', 
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {tags}
        </span>
      )}
    </div>
  );
}

export default ProductInfo;