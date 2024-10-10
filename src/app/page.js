'use client'
import axios from "axios";
import  React,{ useState, useEffect} from "react";

export default function Home() {
  const url = 'http://localhost:3002/contactos';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(url);
      console.log("Datos de contactos recibidos:", response.data.data);
      setContacts(response.data.data); 
      setFilteredContacts(response.data.data);
    } catch (error) {
      console.error('Error al obtener los contactos:', error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async () => {
    const data = {
      nombre: name,  
      numero: phone
    };

    try {
      const response = await axios.post(url, data);
      console.log('Response:', response.data);
      setName('');
      setPhone('');
      fetchContacts();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${url}/search`, { params: { query: searchTerm } });
      setFilteredContacts(response.data.data); 
    } catch (error) {
      console.error('Error al buscar contactos:', error);
    }
  };

  return (
    <div className="">
      <main className="">
        <div className="flex items-center justify-center">
          <div className= "flex flex-col">
            <label>
              Nombre:
            </label>
            <input
              type= 'text'
              id= 'name'
              placeholder = 'Ingrese el nombre'
              value = {name}
              onChange={(e) => setName(e.target.value)}
            />  
            <label>
              Telefono:
            </label>
            <input
              type= 'text'
              id= 'phone'
              placeholder = 'Ingrese el telefono'
              value = {phone}
              onChange={(e) => setPhone(e.target.value)}
            />  
          </div>
          <button 
            tittle="enviar"
            onClick={handleSubmit}
          >
              Enviar
          </button>
        </div>
        <div>
          <input
            type='text'
            placeholder='Buscar contacto...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
        <div>
          <h3>Lista de Contactos</h3>
          <div className="contact-list">
            <h2>Contactos:</h2>
            <ul>
              {console.log("Lista de contactos: ", contacts)}
              {contacts.length > 0 ? (
                  contacts.map(contact => (
                    <li key={contact.id}>
                      {contact.nombre} - {contact.numero}
                    </li>
                  ))
              ): (
                <li> No hay contactos disponibles</li>
              )}
            </ul>
            <h2>Contactos:</h2>
            <ul>
              {filteredContacts.map(contact => (
                <li key={contact.id}>
                  {contact.nombre} - {contact.numero}  
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <footer className="">
      </footer>
    </div>
  );
}
