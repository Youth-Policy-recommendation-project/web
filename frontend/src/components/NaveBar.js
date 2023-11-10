import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
export default function NaveBar() {
  return (
    <div className="header">
        <ButtonGroup variant="text" aria-label="text button group">
          <Link to="/create_item" className="link">
            <Button>One</Button>
          </Link>

          <Link to="/create_item" className="link">
          <Button>Two</Button>
          </Link>

          <Link to="/" className="link">
          <Button>Three</Button>
          </Link>
        </ButtonGroup>
    </div>
  );
}



