import React, {useEffect} from "react"
import { Box, Button } from "@chakra-ui/core";

const Protest = ({ protest, isClicked, onCardClick }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const focus = {
        backgroundColor: "beige",
        width: "100%",
        padding: "10px"
    }

    const card = {
        padding: "10px"
    }

    const cardClick = () => {
        onCardClick(protest.id)
    }

    return (
        <div style={isClicked ? focus : card}>
            <Box onClick={cardClick} bg="LightSeaGreen" w="75%" p={4} color="white" as="button" borderWidth="1px" rounded="lg">
                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h2"
                    lineHeight="tight"
                    isTruncated
                    color="white"
                >
                    {protest.title}
                </Box>
                <Box
                    color="gray.500"
                >
                    {days[protest.date.getDay()]} at {protest.time}
                </Box>
                <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                >
                    {protest.startLoc} &bull; {protest.endLoc}
                </Box>
                <Box
                    color="white"
                >
                    {protest.description}
                </Box>
            </Box>
        </div>
    )
}

export default Protest