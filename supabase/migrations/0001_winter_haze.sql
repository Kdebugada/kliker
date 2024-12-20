/*
  # Create leaderboard table

  1. New Tables
    - `leaderboard`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `income_per_second` (double precision)
      - `last_updated` (timestamptz)

  2. Security
    - Enable RLS on `leaderboard` table
    - Add policies for public read and authenticated write
*/

CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  income_per_second double precision NOT NULL DEFAULT 0,
  last_updated timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the leaderboard
CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to insert/update their own score
CREATE POLICY "Anyone can insert/update their own score"
  ON leaderboard
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update their own score"
  ON leaderboard
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow anyone to delete their own entry
CREATE POLICY "Anyone can delete their own entry"
  ON leaderboard
  FOR DELETE
  TO public
  USING (true);