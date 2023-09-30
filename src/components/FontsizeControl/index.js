import {ButtonGroup, Button, Stack} from "@mui/material";
import {Add as AddIcon, Remove as RemoveIcon} from '@mui/icons-material';

export default function FontsizeControl({title,onChange}) {
    return<Stack direction={"row"} alignItems={'center'} justifyContent={'space-between'}>
        {title}
        <ButtonGroup size="small" variant="outlined" aria-label="outlined button group"  sx={{color:"unset"}}>
        <Button  sx={{color:"unset"}} onClick={()=>onChange(true)}>
            <AddIcon/>
        </Button>
        <Button  sx={{color:"unset"}} onClick={()=>onChange(false)}>
            <RemoveIcon/>
        </Button>
    </ButtonGroup>
    </Stack>
}