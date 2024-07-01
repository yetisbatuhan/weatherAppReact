import React, { useState ,  useEffect} from 'react';
import { Link } from 'react-router-dom';
import Search from '../../pages/Search';


const Header = () => {
    const menuList = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];
    const [searchBar,setSearchBar] = useState(false);
    const [menu,setMenu] = useState(false);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth >= 748 && menu == true){
        setMenu(false);
      }          
      }
    ;
   useEffect(() => {
    window.addEventListener('resize', handleResize);
    
   }, [windowWidth]);
   
    return (
        <div className=' sm:justify-center md:flex md:justify-between container  mx-auto py-3  '>
            <div className='logo  '>
             <h1 className='text-[20px] text-center md:text-[30px]  xl:text-[40px]  font-serif '>2DAY <span className='border bg-red-500 text-white rounded-b-lg px-2 font-extrabold '>News</span></h1>
             
            </div>
            <div className='menu-list px-16 text-center'>
  <img className='md:hidden mx-auto' onClick={() => setMenu(!menu)} src="https://img.icons8.com/ios/50/000000/menu--v7.png" alt="menu--v7" />
  {menu === false ? (
    menuList.map((category, index) => (
      <Link to={category} className='sm:px-1 md:px-2 hidden md:inline-block pt-3 font-bold text-[20px] hover:text-red-600' key={index}>{category}</Link>
    ))
  ) : (
    menuList.map((category, index) => (
      <Link to={category} className='block px-auto pt-3 font-bold text-[20px] border-b-2 border-black' key={index}>{category}</Link>
    ))
  )}
</div>
            <div className='menu-end hidden md:flex items-center'>
            <img
                onClick={() => {
                    setSearchBar((prevSearchBar) => !prevSearchBar);
                }}
                src="https://img.icons8.com/ios-filled/50/search--v1.png"
                alt="search--v1"
            />
            {searchBar && (
                <div className='flex'>
                    <input
                        className='w-full md:w-auto md:h-8' 
                        type="text"
                        id="fname"
                        name="fname"
                        onChange={(e) => setSearchQuery((prevSearchQuery) => e.target.value)}

                        placeholder="Ara..."
                    />
<Link
  to={{
    pathname: "/search", 
    state: { searchQuery: searchQuery } 
  }}
>
  <button onClick={() =>{console.log(searchQuery)}} className='px-1 border mx-1 bg-red-500 text-white text-lg'>
    Ara
  </button>
</Link>            </div> 
            )}
        </div>
    
        </div>
    );
        }

export default Header;
