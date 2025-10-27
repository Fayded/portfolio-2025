import { motion } from 'framer-motion';
import logo from './assets/logo.svg'

function Logo () {
  return ( 
    <div className="col-start-23 col-end-25">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <motion.img 
          className="logo" 
          src={logo} 
          alt="Logo"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.3, 
            duration: 0.8, 
            type: "spring", 
            stiffness: 200, 
            damping: 15 
          }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
        />
      </motion.div>
    </div>
  );
}

export default Logo;