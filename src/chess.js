export const WHITE_PAWN   = "♙";
export const BLACK_PAWN   = "♟";
export const WHITE_ROOK   = "♖";
export const BLACK_ROOK   = "♜";
export const WHITE_BISHOP = "♗";
export const BLACK_BISHOP = "♝";
export const WHITE_KNIGHT = "♘";
export const BLACK_KNIGHT = "♞";
export const WHITE_QUEEN  = "♕";
export const BLACK_QUEEN  = "♛";
export const WHITE_KING   = "♔";
export const BLACK_KING   = "♚";

export const WHITES = WHITE_PAWN + WHITE_ROOK + WHITE_BISHOP + WHITE_KNIGHT + WHITE_QUEEN + WHITE_KING;
export const BLACKS = BLACK_PAWN + BLACK_ROOK + BLACK_BISHOP + BLACK_KNIGHT + BLACK_QUEEN + BLACK_KING;
export const PAWNS = WHITE_PAWN + BLACK_PAWN;
export const ROOKS = WHITE_ROOK + BLACK_ROOK;
export const KNIGHTS = WHITE_KNIGHT + BLACK_KNIGHT;
export const BISHOPS = WHITE_BISHOP + BLACK_BISHOP;
export const QUEENS = WHITE_QUEEN + BLACK_QUEEN;
export const KINGS = WHITE_KING + BLACK_KING;

export const PROMOTIONS = [
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