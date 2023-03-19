import React, { useRef, useEffect } from "react";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Canvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Set canvas dimensions
        canvas.width = 200;
        canvas.height = 200;

        // Set initial pen settings
        context.lineWidth = 5;
        context.lineCap = "round";
        context.strokeStyle = "black";

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        const draw = (e) => {
        if (!isDrawing) return;
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
        });
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", () => (isDrawing = false));
        canvas.addEventListener("mouseout", () => (isDrawing = false));
    }, []);

    const clearCanvas = (event) => {
        event.preventDefault();
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div>
            <canvas style={{ border: "1px solid black" }}  ref={canvasRef} />
            <Button onClick={clearCanvas} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                Clear Canvas
            </Button>
        </div>
    );
};


export default Canvas;
