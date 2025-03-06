import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import baju from "/baju.jpg";

const DetailProduk = () => {
    let { id } = useParams();
    const [DetailProduk, setDetailProduk] = useState(null);
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://10.50.0.13:3003/products/1`);
                setDetailProduk(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const addToCart = () => {
        if (DetailProduk) {
            const newItem = {
                id: DetailProduk.id,
                name: DetailProduk.name,
                price: DetailProduk.price,
                quantity: quantity
            };

            const existingItem = cart.find(item => item.id === newItem.id);
            if (existingItem) {
                setCart(cart.map(item =>
                    item.id === newItem.id ? { ...item, quantity: item.quantity + quantity } : item
                ));
            } else {
                setCart([...cart, newItem]);
            }
            setQuantity(1);
        }
    };

    const increaseQuantity = () => {
        if (DetailProduk && quantity < DetailProduk.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div style={styles.container}>
            {DetailProduk && (
                <>
                    <div style={styles.imageBox}>
                        <img 
                            src={baju} 
                            alt={DetailProduk.name} 
                            style={styles.productImage} 
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400'; }}
                        />
                    </div>
                    <div style={styles.detailBox}>
                        <h2 style={styles.title}>Detail Produk</h2>
                        <p><strong>Nama Produk:</strong> {DetailProduk.name}</p>
                        <p><strong>Harga:</strong> Rp {DetailProduk.price}</p>
                        <p><strong>Kategori:</strong> {DetailProduk.categoryId}</p>
                        <p><strong>Deskripsi:</strong> {DetailProduk.description}</p>
                        <p><strong>Stok:</strong> 
                            <span style={{ color: DetailProduk.stock > 0 ? '#28a745' : '#dc3545' }}>
                                {DetailProduk.stock > 0 ? ` Tersedia (${DetailProduk.stock})` : ' Stok Habis'}
                            </span>
                        </p>
                        {DetailProduk.stock > 0 && (
                            <div style={styles.quantityControl}>
                                <button onClick={decreaseQuantity} style={styles.quantityButton}>-</button>
                                <span style={styles.quantityText}>{quantity}</span>
                                <button onClick={increaseQuantity} style={styles.quantityButton}>+</button>
                            </div>
                        )}
                        {DetailProduk.stock > 0 && (
                            <button style={styles.button} onClick={addToCart}>
                                🛒 Tambah ke Keranjang
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        padding: '20px',
    },
    imageBox: {
        flex: '1',
        maxWidth: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    productImage: {
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
        objectFit: 'contain',
        borderRadius: '10px'
    },
    detailBox: {
        flex: '2',
        maxWidth: '400px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff'
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333'
    },
    loadingText: {
        textAlign: 'center',
        color: '#888'
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        marginTop: '10px'
    },
    quantityControl: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '10px'
    },
    quantityButton: {
        padding: '5px 10px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer'
    },
    quantityText: {
        fontSize: '18px',
        fontWeight: 'bold'
    }
};

export default DetailProduk;