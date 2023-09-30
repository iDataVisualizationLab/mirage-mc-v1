import {styled} from "@mui/material/styles";
import {Paper} from "@mui/material";

const PaperCustom = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    borderRadius:10,
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default PaperCustom;