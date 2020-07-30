import React, {useEffect} from "react"
import { Box, IconButton, Text } from "@chakra-ui/core";

const Protest = ({ protest, isClicked, onCardClick, openModal, attending, onAddClick }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let date = new Date(Date.parse(protest.time));

    let hour = date.getHours() > 12 ?  date.getHours() - 12 : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let timeOfDay = date.getHours() > 12 ? 'PM' : 'AM'
    let time = hour + ':' + minutes + ' ' + timeOfDay

    const focus = {
        backgroundColor: "beige",
        width: "100%",
        padding: "10px"
    }

    const card = {
        padding: "10px"
    }

    const cardClick = () => {
        onCardClick(protest._id)
    }

    return (
        <div style={isClicked ? focus : card}>
            <Box onClick={cardClick} boxShadow="lg" bg="white" w="75%" p={6} color="white" as="button" borderWidth="1px" rounded="lg">
                {
                    attending ? (
                        <Box>
                            <IconButton icon="check" size="lg" color="white" variantColor="teal" aria-label="get info" onClick={() => onAddClick(protest)}/>
                        </Box>
                    ) : (
                        <Box>
                            <IconButton icon="add" size="lg" color="white" variantColor="teal" aria-label="get info" onClick={() => onAddClick(protest)}/>
                        </Box>
                    )
                }
                <Box
                    mt="1"
                    fontWeight="bold"
                    as="h2"
                    lineHeight="tight"
                    isTruncated
                    color="black"
                    fontSize={22}
                >
                    {protest.title}
                </Box>
                <Box
                    fontSize={18}
                    color="gray.500"
                >
                    {days[date.getDay()]} {date.getMonth()+1}/{date.getDate()} at {time}
                </Box>
                <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="s"
                    textTransform="uppercase"
                    ml="2"
                >
                    {protest.startLocation[0].location.city}
                </Box>
                <IconButton icon="info-outline" size="lg" color="black" variantColor="white" aria-label="get info" onClick={() => openModal(time)}/>
            </Box>
        </div>
    )
}

export default Protest