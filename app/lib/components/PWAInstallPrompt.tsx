// import { Box, Button, Typography, Slide } from '@mui/material';
// import Image from 'next/image';

// // ... (other imports and code remain the same)

// const PWAInstallPrompt = ({ open, onClose, onInstall, logo }) => {
//   return (
//     <Slide direction="up" in={open} mountOnEnter unmountOnExit>
//       <Box
//         sx={{
//           position: 'fixed',
//           bottom: 0,
//           left: 0,
//           right: 0,
//           bgcolor: 'background.paper',
//           borderTopLeftRadius: 16,
//           borderTopRightRadius: 16,
//           boxShadow: 3,
//           p: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'flex-start',
//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//           <Box sx={{ mr: 2, borderRadius: '12px', overflow: 'hidden' }}>
//             <Image src={logo} alt="PWA Logo" width={48} height={48} />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" fontWeight="bold">PWA</Typography>
//             <Typography variant="body2" color="text.secondary">
//               Installation component for Progressive Web Application DEMO
//             </Typography>
//           </Box>
//           <Button 
//             sx={{ ml: 'auto' }} 
//             onClick={onClose}
//           >
//             ✕
//           </Button>
//         </Box>
//         <Typography variant="body1" sx={{ mb: 2 }}>
//           This site has app functionality. Add it to your Home Screen for extensive experience and easy access.
//         </Typography>
//         <Button
//           variant="contained"
//           fullWidth
//           onClick={onInstall}
//           sx={{
//             bgcolor: 'background.paper',
//             color: 'text.primary',
//             border: 1,
//             borderColor: 'divider',
//             justifyContent: 'space-between',
//             px: 2,
//             py: 1,
//           }}
//         >
//           <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
//             <Box
//               component="span"
//               sx={{ 
//                 width: 24, 
//                 height: 24, 
//                 bgcolor: 'action.selected',
//                 borderRadius: 1,
//                 mr: 2 
//               }}
//             />
//             Add to Home Screen
//           </Box>
//           <Box component="span">+</Box>
//         </Button>
//       </Box>
//     </Slide>
//   );
// };


// export default PWAInstallPrompt;