const WHITE_PAWN   = "♙";
const BLACK_PAWN   = "♟";
const WHITE_ROOK   = "♖";
const BLACK_ROOK   = "♜";
const WHITE_BISHOP = "♗";
const BLACK_BISHOP = "♝";
const WHITE_KNIGHT = "♘";
const BLACK_KNIGHT = "♞";
const WHITE_QUEEN  = "♕";
const BLACK_QUEEN  = "♛";
const WHITE_KING   = "♔";
const BLACK_KING   = "♚";

const WHITES = WHITE_PAWN + WHITE_ROOK + WHITE_BISHOP + WHITE_KNIGHT + WHITE_QUEEN + WHITE_KING;
const BLACKS = BLACK_PAWN + BLACK_ROOK + BLACK_BISHOP + BLACK_KNIGHT + BLACK_QUEEN + BLACK_KING;
const PAWNS = WHITE_PAWN + BLACK_PAWN;
const ROOKS = WHITE_ROOK + BLACK_ROOK;
const KNIGHTS = WHITE_KNIGHT + BLACK_KNIGHT;
const BISHOPS = WHITE_BISHOP + BLACK_BISHOP;
const QUEENS = WHITE_QUEEN + BLACK_QUEEN;
const KINGS = WHITE_KING + BLACK_KING;

const ORTHOGONALS = QUEENS + ROOKS;
const DIAGONALS = QUEENS + BISHOPS;

const PROMOTIONS = [
    WHITE_QUEEN + WHITE_KNIGHT + WHITE_ROOK + WHITE_BISHOP,
    BLACK_QUEEN + BLACK_KNIGHT + BLACK_ROOK + BLACK_BISHOP];

export const INITIAL_BOARD = [
    ['♜','♞','♝','♛','♚','♝','♞','♜'],
    ['♟','♟','♟','♟','♟','♟','♟','♟'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['♙','♙','♙','♙','♙','♙','♙','♙'],
    ['♖','♘','♗','♕','♔','♗','♘','♖']];

const KNIGHT_VECTORS = [
    [ 1,  2],
    [ 2,  1],
    [ 2, -1],
    [ 1, -2],
    [-1, -2],
    [-2, -1],
    [-2,  1],
    [-1,  2]];
const KING_VECTORS = [
    [ 1,  1],
    [ 1,  0],
    [ 1, -1],
    [ 0, -1],
    [-1, -1],
    [-1,  0],
    [-1,  1],
    [ 0,  1],
    [ 0,  2],
    [ 0, -2]];

const DEAD_POSITIONS = [
    "♔♚",
    "♔♗♚",
    "♔♚♝",
    "♔♘♚",
    "♔♚♞"];

//checks if a players is trying to move an opponents piece, or if the square they are moving to contains
//a piece of the same color as the players
const checkForSameTeam = (board, from_piece, to_piece, cur_turn) =>{
    let white_from_piece = WHITES.includes(from_piece);
    return (cur_turn === white_from_piece) && (to_piece === ' ' || white_from_piece !== WHITES.includes(to_piece));

};

const squareDiff = (from, to) =>{
    return [to[0] - from[0], to[1] - from[1]];
};

const updateBoard = (board, from, to, from_piece) =>{
    board[from[0]][from[1]] = ' ';
    board[to[0]][to[1]] = from_piece;
    return board;
};

const checkPath = (board, path) =>{
    for (let step = 0; step < path.length; ++ step){
        let cur_step = path[step];

        if (board[cur_step[0]][cur_step[1]] !== ' '){
            return false;
        }
    }
    return true;
};

const getSquare = (board, square) =>{
    if (square[0] >= board.length || square[0] < 0 || square[1] >= board[0].length || square[1] < 0){
        return null;
    }
    return board[square[0]][square[1]];
};


export function copyBoard(board) {
    let copy = [];
    board.forEach(row => {
        copy.push(row.slice());
    });
    return copy;
}

export const validateMove = (board, from, to, moves, cur_turn) =>{

    let from_piece = getSquare(board, from);
    let to_piece = getSquare(board, to);

    if (!from_piece || ! to_piece){
        return [board, false];
    }
    let from_row = from[0];
    let from_col = from[1];
    let to_row = to[0];
    let to_col = to[1];

    const [row_diff, col_diff] = squareDiff(from, to);
    let abs_row_diff = Math.abs(row_diff);
    let abs_col_diff = Math.abs(col_diff);
    let capture = to_piece !== ' ' && WHITES.includes(to_piece) !== cur_turn;
    let path = [];

    let castleBoard = copyBoard(board);
    let postMoveBoard = copyBoard(board);
    postMoveBoard = updateBoard(postMoveBoard, from, to, from_piece);
    //maybe move to end after all other checks pass
    //this currently does not allow for castling
    if (!checkForSameTeam(board, from_piece, to_piece, cur_turn)){
        return [board, false];
    }
    //does not include promotion
    if (PAWNS.includes(from_piece)){
        let move_direction = cur_turn ? -1 : 1;
        //if pawn moves one space forward on the same column, it cannot capture
        if (row_diff === move_direction && col_diff === 0) {
            if (capture){
                return [board, false]
            }
           // return [updateBoard(board, from, to, from_piece), true];

        }
        //can only move two space from start pos and cannot capture
        else if (row_diff === move_direction * 2 && col_diff === 0 && !capture){
            if (from_row !== (cur_turn ? 6 : 1)){
                return [board, false];
            }else{
                path.push([from_row + move_direction, from_col]);
                //return [updateBoard(board, from, to, from_piece), true];
            }
            //checks for diagnal move, makes sure its a capture
        }else if (row_diff === move_direction && abs_col_diff === 1) {
            //check for en passant
            if (moves.length > 0) {
                let lastMove = moves[moves.length - 1];
                let [last_row_diff, last_col_diff] = squareDiff(lastMove.from, lastMove.to);
                if (to_col === lastMove.to[1] && to_row === lastMove.to[0] + move_direction
                    && PAWNS.includes(lastMove.piece) && last_row_diff === 2 && last_col_diff === 0) {
                    board[lastMove.to[0]][lastMove.to[1]] = ' ';
                    capture = true;
                    //return [updateBoard(board, from, to, from_piece), true];
                }
            }
            if (!capture) {
                //return [updateBoard(board, from, to, from_piece), true];
                return [board, false];
            }

        }
        //any other invalid move
        else{
            return [board, false];
        }

    }
    else if (KNIGHTS.includes(from_piece)) {
        if (!(abs_row_diff === 2 && abs_col_diff === 1) && !(abs_row_diff === 1 && abs_col_diff === 2)) {
            return [board, false];
        }
    }
    else if (QUEENS.includes(from_piece)){
        //check if hoprizontal move
        if (row_diff === 0){
            let move_direction = (col_diff < 0) ? -1 : 1;
            for (let i = from_col + move_direction; i !== to_col; i += move_direction){
                path.push([from_row, i]);
            }
            //check if vertical move
        }else if (col_diff === 0){
            let move_direction = (row_diff < 0) ? -1 : 1;
            for (let i = from_row + move_direction; i !== to_row; i += move_direction){
                path.push([i, from_col]);
            }

        }else if (abs_row_diff === abs_col_diff){
            let h_move_direction = (col_diff < 0) ? -1 : 1;
            let v_move_direction = (row_diff < 0) ? -1 : 1;
            for (let i = v_move_direction, j = h_move_direction; i !== row_diff; (i += v_move_direction)
            && (j += h_move_direction)){
                path.push([from_row + i, from_col + j]);
            }
        }else{
            return [board, false];
        }
    }else if (BISHOPS.includes(from_piece)){
        //check if bishop moves diagnally
        if (abs_row_diff === abs_col_diff){
            let h_move_direction = (col_diff < 0) ? -1 : 1;
            let v_move_direction = (row_diff < 0) ? -1 : 1;
            for (let i = v_move_direction, j = h_move_direction; i !== row_diff; (i += v_move_direction)
            && (j += h_move_direction)){
                path.push([from_row + i, from_col + j]);
            }
        }else{
            return [board, false];
        }
    }else if (ROOKS.includes(from_piece)) {
        //check if rook moves horizontally
        if (row_diff === 0) {
            let move_direction = (col_diff < 0) ? -1 : 1;
            for (let i = from_col + move_direction; i !== to_col; i += move_direction) {
                path.push([from_row, i]);
            }
            //check if rook moves vertically
        } else if (col_diff === 0) {
            let move_direction = (row_diff < 0) ? -1 : 1;
            for (let i = from_row + move_direction; i !== to_row; i += move_direction) {
                path.push([i, from_col]);
            }
        } else {
            return [board, false];
        }
    }else if (KINGS.includes(from_piece)){
        //check for castling
        if (from_col === 4 && from_row === ((cur_turn) ? 7 : 0) && abs_col_diff === 2 && row_diff === 0){
            let rookFromSquare = [to_row, (col_diff > 0) ? 7 : 0];
            let rook = getSquare(board, rookFromSquare);

            //check if rook is there on correct side
            if (rook !== ROOKS[(cur_turn) ? 0 : 1]) {
                return [board, false];
            }

            //check if the king or rook has been moved
            for (let i = 0; i < moves.length; i++) {
                if (JSON.stringify(moves[i].to) === JSON.stringify(from) ||
                    JSON.stringify(moves[i].from) === JSON.stringify(rookFromSquare)) {
                    return [board, false];
                }
            }

            //check path of king and rook later
            if (col_diff > 0) {
                [1, 2].forEach(x => path.push([from_row, from_col + x]));
            } else {
                [1, 2, 3].forEach(x => path.push([from_row, from_col - x]));
            }

            let rookToSquare = [from[0], from[1] + ((col_diff > 0) ? 1 : -1)];
            updateBoard(castleBoard, from, rookToSquare, from_piece);
            let checked = findCheck(castleBoard, cur_turn);
            if(checked){
                return [board, false];
            }
            updateBoard(postMoveBoard, rookFromSquare, rookToSquare, rook);
        }
        else{
            if (abs_col_diff > 1 || abs_row_diff > 1 ){
                return [board, false];
            }
        }
        //worry about castling after implementing lookForCheck

    }

    if (path){
        if (!checkPath(board, path)){
            return [board, false];
        }
    }
    let checked = findCheck(postMoveBoard, cur_turn);
    if (checked){
       return [board, false];
    }
    return [postMoveBoard, true];

};

//returns all instances of the given pieces on the board as their position
const findPieces = (board, pieces) => {

    const result = [];
    for (let r = 0; r < board.length; r++) {
        const row = board[r];
        for (let c = 0; c < row.length; c++) {
            if (pieces.includes(row[c])) {
                result.push([r, c]);
            }
        }
    }
    return result;
};

//return all pieces
const getPieces = (board) =>{
    const result = [];
    for (let r = 0; r < board.length; r++) {
        const row = board[r];
        for (let c = 0; c < row.length; c++) {
            if (row[c] !== ' ') {
                result.push([row[c], [r, c]]);
            }
        }
    }
    return result.sort();

};

const getAllMoves = (board, from) =>{
    const result = [];
    const piece = getSquare(board, from);
    if (piece === ' '){
        return result
    }
    const side = WHITES.includes(piece);
    let vectors = null;

    if (KINGS.includes(piece)) {
        vectors = KING_VECTORS;
    } else if (KNIGHTS.includes(piece)) {
        vectors = KNIGHT_VECTORS;
    } else if (PAWNS.includes(piece)) {
        vectors = [
            [1,  0],
            [2,  0],
            [1,  1],
            [1, -1]];
        if (side) {
            vectors = vectors.map(([row, col]) => [-row, col]);
        }
    }
    if (vectors) {
        const possibleMoves = vectors.map(([row, col]) => [from[0] + row, from[1]+ col]);
        possibleMoves.forEach(move => {
            const to = getSquare(board, move);
            if (to != null && to === ' ' || side !== WHITES.includes(to)) {
                result.push(move);
            }
        });
        return result;
    }
    let from_row = from[0];
    let from_col = from[1];
    let len = board.length;
    let row = board[from_row];
    if (ORTHOGONALS.includes(piece)) {
        for (let i = 0, move_direction = 1; i < 2; i++) {
            // Vertical
            for (let row = from_row + move_direction; row >= 0 && row < len; row += move_direction) {
                let curSquare = [row, from_col];
                let curSquarePiece = getSquare(board, curSquare);
                if (curSquarePiece !== ' ' && side === WHITES.includes(curSquarePiece)) {
                    break;
                }
                result.push(curSquare);
                if (curSquarePiece !== null) {
                    break;
                }
            }
            // Horizontal
            for (let col = from_col + move_direction; col >= 0 && col < row.length; col += move_direction) {
                let curSquare = [from_row, col];
                let curSquarePiece = getSquare(board, curSquare);
                if (curSquarePiece !== ' ' && side === WHITES.includes(curSquarePiece)) {
                    break;
                }
                result.push(curSquare);
                if (curSquarePiece !== null) {
                    break;
                }
            }
        }
    }
    if (DIAGONALS.includes(piece)) {
        for (let i = 0, move_direction = 1; i < 2; i++) {
            let col_diff = move_direction;
            let row_diff = move_direction;
            for (let j = 0; j < 2; j++) {
                let curSquare = [from[0]+ row_diff, from[1]+col_diff];
                let curSquarePiece = getSquare(board, curSquare);
                while (curSquarePiece) {
                    if (curSquarePiece !== ' ' && side === WHITES.includes(curSquarePiece)) {
                        break;
                    }
                    result.push(curSquare);
                    if (curSquarePiece !== ' ') {
                        break;
                    }
                    curSquare = [curSquare[0]+ row_diff, curSquare[1]+col_diff];
                    curSquarePiece = getSquare(board, curSquare);
                }
                row_diff  = -move_direction;
            }
            move_direction = -move_direction;
        }
    }
    return result;
};

export function findCheck(board, cur_turn) {

     //Find whether the given side's king is in check.
     //returns the position of the first check, and null otherwise
    const piece = KINGS[(cur_turn) ? 0 : 1];
    const king_spot = findPieces(board, piece);
    if (king_spot.length === 0) {
        console.log(`Error: ${piece} not found when testing for check.`);
        return false;
    }
    const king_location = king_spot[0];

    // look for check from opposing knight
    for (let i = 0; i < KNIGHT_VECTORS.length; i++) {
        let cur_vector = KNIGHT_VECTORS[i];
        let spot_to_check = [king_location[0] + cur_vector[0], king_location[1] + cur_vector[1]];
        let piece = getSquare(board, spot_to_check);
        if (KNIGHTS.includes(piece) && WHITES.includes(piece) !== cur_turn) {
            return spot_to_check;
        }
    }

    // look for check from opposing pawns
    let pawn_vectors = [
        [(cur_turn) ? -1 : 1,  1],
        [(cur_turn) ? -1 : 1, -1]];
    for (let i = 0; i < pawn_vectors.length; i++) {
        let cur_vector = pawn_vectors[i];
        let spot_to_check = [king_location [0] + cur_vector[0], king_location [1] + cur_vector[1]];
        let piece = getSquare(board, spot_to_check);
        if (PAWNS.includes(piece) && WHITES.includes(piece) !== cur_turn) {
            return spot_to_check;
        }
    }

    let king_vectors = [
        [ 0,  1],
        [ 1,  1],
        [ 1,  0],
        [ 1, -1],
        [ 0, -1],
        [-1, -1],
        [-1,  0],
        [-1,  1]];
    for (let i = 0; i < king_vectors.length; i++) {
        let cur_vector = king_vectors[i];
        let spot_to_check = [king_location [0] + cur_vector[0], king_location [1] + cur_vector[1]];
        let piece = getSquare(board, spot_to_check);
        if (KINGS.includes(piece) && WHITES.includes(piece) !== cur_turn) {
            return spot_to_check;
        }
    }

    const len = board.length;
    const row = board[king_location[0]];
    let orthogonals, diagonals;
    if (cur_turn) {
        orthogonals = BLACK_QUEEN + BLACK_ROOK;
        diagonals = BLACK_QUEEN + BLACK_BISHOP;
    } else {
        orthogonals = WHITE_QUEEN + WHITE_ROOK;
        diagonals = WHITE_QUEEN + WHITE_BISHOP;
    }
    for (let i = 0, step = 1; i < 2; i++) {
        // Vertical
        for (let r = king_location[0] + step; r >= 0 && r < len; r += step) {
            let spot_to_check = [r, king_location[1]];
            let piece = getSquare(board, spot_to_check);
            if (piece === ' ') {
                continue;
            }
            if (orthogonals.includes(piece)) {
                return spot_to_check;
            } else {
                break;
            }
        }
        // Horizontal
        for (let c = king_location[1] + step; c >= 0 && c < row.length; c += step) {
            let spot_to_check = [king_location[0], c];
            let piece = getSquare(board, spot_to_check);
            if (piece === ' ') {
                continue;
            }
            if (orthogonals.includes(piece)) {
                return spot_to_check;
            } else {
                break;
            }
        }
        // Diagonal
        let h = step;
        let v = step;
        for (let j = 0; j < 2; j++) {
            let spot_to_check = [king_location [0] + v, king_location [1] + h];
            let piece = getSquare(board, spot_to_check);
            while (piece) {
                if (piece !== ' ') {
                    if (diagonals.includes(piece)) {
                        return spot_to_check;
                    } else {
                        break;
                    }
                }
                spot_to_check = [spot_to_check [0] + v, spot_to_check [1] + h];
                piece = getSquare(board, spot_to_check);
            }
            v = -step;
        }
        step = -step;
    }

    return null;
}

const findCheckmate = (board, cur_turn, moves) =>{
    //find if after a move, the other side is in check at all;
    let checkSquare = findCheck(board, cur_turn);
    if (!checkSquare){
        return false;
    }

    let king = cur_turn ? WHITE_KING : BLACK_KING;

    let kingSquare = findPieces(board, king)[0];

    let checkingPiece = getSquare(board, checkSquare);

    let kingMoves = KING_VECTORS.map(x => [kingSquare[0]+ x[0], kingSquare[1] + x[1]]);

    //check if the king can escape
    for (let i = 0; i < kingMoves.length; i++) {

        if (validateMove(board, kingSquare, kingMoves[i], moves, cur_turn)[1]) {
            return false;
        }
    }

    //check if path of attacker can be blocked

    //first, what path the check is coming from;
    const [row_diff, col_diff] = squareDiff(kingSquare, checkSquare);
    let abs_row_diff = Math.abs(row_diff);
    let abs_col_diff = Math.abs(col_diff);
    let path = [checkSquare];
    //
    if (row_diff === 0){
        let move_direction = (col_diff > 0) ? 1 : -1;
        for (let i = move_direction; i !== col_diff; i += move_direction) {
            path.push([checkSquare[0], checkSquare[1] + i]);
        }
    }
    else if (col_diff === 0){
        let move_direction = (row_diff > 0) ? 1 : -1;
        for (let i = move_direction; i !== row_diff; i += move_direction) {
            path.push([checkSquare[0] + i, checkSquare[1]]);
        }
    }
    else if (abs_row_diff === abs_col_diff) {
        // Diagonal
        let v_move_direction = (row_diff > 0) ? 1 : -1;
        let h_move_direction = (col_diff > 0) ? 1 : -1;
        for (let i = v_move_direction, j = h_move_direction; i !== row_diff;
             i += v_move_direction, j += h_move_direction) {
            path.push([checkSquare[0] + i, checkSquare[1] + j]);
        }
    }

    let allies = cur_turn ?
        WHITE_QUEEN + WHITE_ROOK + WHITE_BISHOP + WHITE_KNIGHT + WHITE_PAWN :
        BLACK_QUEEN + BLACK_ROOK + BLACK_BISHOP + BLACK_KNIGHT + BLACK_PAWN;
    let cur_allies = findPieces(board, allies);
    for (let i = 0; i < cur_allies.length; i++) {
        for (let j = 0; j < path.length; j++) {
            //board, from, to, moves, cur_turn
            if (validateMove(board, cur_allies[i], path[j], moves, cur_turn)[1]) {
                return false;
            }
        }
        //check if the attacking piece is a pawn, and if so, is it open to an en passant capture?
        //very unlikely, but need to check
        const ally = getSquare(board, cur_allies[i]);
        if (PAWNS.includes(ally) && PAWNS.includes(checkingPiece)) {
            const lastMove = moves[moves.length - 1];
            const [row_diff, col_diff] = squareDiff(lastMove.to, lastMove.from);
            if (lastMove.to === checkSquare && Math.abs(row_diff) === 2 && col_diff === 0) {
                const to = [lastMove.to[0] + (row_diff > 0) ? 1 : -1, lastMove[1]];
                if (validateMove(board, cur_allies[i], to, moves, cur_turn)[1]) {
                    return false;
                }
            }
        }
    }
    return true;
};


//check for stalemate
const findStalemate = (board, cur_turn, moves) => {
    if (findCheck(board, cur_turn)){
        return false;
    }

    //checks if the remaining pieces are not capable of checkmating
    let pieces = getPieces(board);
    let allPieces = pieces.map(piece => piece[0]).join('');
    if (DEAD_POSITIONS.includes(allPieces)){
        return true;
    }

    //checks if the only pieces left are kings and a bishop on either side, and if so
    //if they are on the same color, as this is a dead position
    if (allPieces === "♔♗♚♝") {
        // Only a dead position if both bishops are on the same colour.
        let bishop1 = findPieces(board, WHITE_BISHOP);
        let bishop2 = findPieces(board, BLACK_BISHOP);
        let bishop1Color = bishop1[0] % 2 === bishop1[1] % 2;
        let bishop2Color = bishop2[0] % 2 === bishop2[1] % 2;
        if (bishop1Color === bishop2Color) {
            return true;
        }
    }
    //checks if remaining pieces of color to move have any valid moves
    let allies = pieces.filter(piece => cur_turn === WHITES.includes(piece[0]));
    for (let i = 0; i < allies.length; i++) {
        let allMoves = getAllMoves(board, allies[i][1]);
        for (let j = 0; j < allMoves.length; j++) {
            if (validateMove(board, allies[i][1], allMoves[j], moves, cur_turn)[1]) {
                return false;
            }
        }
    }
    return true;
};

export const checkForEndGame = (board, cur_turn, moves) => {
    if (findCheckmate(board, cur_turn, moves)){
        return [true, "checkmate"]
    }else if (findStalemate(board, cur_turn, moves)){
        return [true, "stalemate"];
    }

    return false;
};