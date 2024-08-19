import { Box, Container, Typography } from "@mui/material";
import { Event } from "../types";
import Image from "next/image";
import { format, parseISO, isSameYear } from "date-fns";

interface FooterProps {
  event?: Event; // Making event optional
}

const Footer = ({ event }: FooterProps) => {

  const formatDateRange = (startDateString: string, endDateString: string) => {
    const startDate = parseISO(startDateString);
    const endDate = parseISO(endDateString);

    // Format the dates as dd/MM/yyyy
    const startDateFormatted = format(startDate, 'dd/MM/yy');
    const endDateFormatted = format(endDate, 'dd/MM/yy');

    return `${startDateFormatted} - ${endDateFormatted}`;
  };

  return (
    <Box
      sx={{
        position: 'fixed',  // Fixed position to stay at the bottom
        bottom: 0,
        left: 0,
        zIndex: 1100, // Ensure the footer stays above other content
        width: "100%",
        // height: "auto",
        backgroundColor: "primary.main",
        paddingTop: event ? "1rem" : "0.5rem", // Less padding if no event
        paddingBottom: event ? "1rem" : "0.5rem", // Less padding if no event
        display: 'flex',
        alignItems: 'center',
        justifyContent: event ? 'space-between' : 'center', // Center the logo if no event
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: event ? "space-between" : "center", // Center the logo if no event
            flexWrap: "nowrap",
          }}
        >
          {event && (
            <Box
              sx={{
                flexGrow: 1,
                flexShrink: 1,
                minWidth: "150px",
                maxWidth: "calc(100% - 320px)",
              }}
            >
              <Typography variant="subtitle2" color="white" noWrap>
                {event.name}
              </Typography>
              <Typography variant="subtitle2" color="white" noWrap>
                {formatDateRange(event.startDate, event.endDate)}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              position: "relative",
              width: { xs: 230, sm: 280 },
              height: { xs: 40, sm: 100 },
              flexShrink: 0,
              marginLeft: event ? "1rem" : 0,
            }}
          >
            <Image
              src="/images/powered.png"
              alt="Powered by Unibagué"
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 600px) 100px, 200px" // Adjust sizes as needed
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
