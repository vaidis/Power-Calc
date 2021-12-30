import React from "react";

// redux
import { useDispatch } from "react-redux";
import { delDevice, delArea } from "../House/houseSlice";

// material-ui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// components
import EditDevice from "../Device/EditDevice";
import AddDevice from "../Device/AddDevice";
import CurrencyShow from "../Common/CurrencyShow";

import "./Area.css";



function Area({ houseIndex, areaIndex, area, cost }) {
  const dispatch = useDispatch();

  // Total area cost
  let areaCost = 0;
  area.devices.map((device) => {
    let deviceCost = ((device.watt * device.hours) / 1000 ) * cost.price;
    areaCost += Number(deviceCost);
    return null;
  });

  // Delete device button
  function delDeviceHandler(id) {
    console.log("delDeviceHandler id", id);
    const payload = { house: houseIndex, area: areaIndex, device: id };
    dispatch(delDevice(payload));
  }

  // Delete area button
  function delAreaHandler(id) {
    const payload = { house: houseIndex, area: id };
    console.log("delAreaHandler payload", payload);
    dispatch(delArea(payload));
  }

  // create css classes to color area header
  const areaClass = area.title.toLowerCase().replace(/\s/g, "");

  return (
    <div className={"area " + areaClass}>
      <div className="header">

        {/*   Area Title and Cost   */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">{area.title}&nbsp;&nbsp;</Typography>
            <Typography variant="h4">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                {areaCost.toFixed(2)}
                <CurrencyShow houseIndex={houseIndex} />
              </Box>
            </Typography>
          </Box>

          {/* Delete Area button */}
          <Link href="#" onClick={() => delAreaHandler(area.id)}>
            <CancelIcon color="error" />
          </Link>
        </Box>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Model</TableCell>
              <TableCell align="right">Watt</TableCell>
              <TableCell align="right">Hours (Monthly)</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {area.devices.map((device, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{device.model}</TableCell>
                <TableCell align="right">{device.watt}</TableCell>
                <TableCell align="right">{device.hours}</TableCell>
                <TableCell align="right">
                  {parseFloat(((device.watt * device.hours) / 1000) * cost.price).toFixed(
                    2
                  )}
                  <CurrencyShow houseIndex={houseIndex} />
                </TableCell>
                <TableCell align="center">
                  <Link href="#" onClick={() => delDeviceHandler(index)}>
                    <DeleteForeverIcon color="error" />
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <EditDevice
                    houseIndex={houseIndex}
                    areaId={areaIndex}
                    deviceId={index}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AddDevice houseIndex={houseIndex} areaIndex={areaIndex} />
      </TableContainer>
    </div>
  );
}

export default Area;
