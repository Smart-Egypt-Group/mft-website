# Practice figures: how they are measured

`src/content/practice-facts.js` holds the figures the site publishes about MFT's own client work.
They are measured read-only from the firm's Odoo (Odoo 19). This file is the method: re-measure
every figure with it, then update the values and `measuredOn` together. Nothing is estimated.

This repository is public. Keep here only the method and the published figures: no client name,
no client amount, no invoice list and no working notes. The evidence behind each measurement
stays in the firm's own records.

## Figures

| Key | Odoo source | Filter |
|---|---|---|
| `clients` | `account.move` | `move_type = out_invoice`, `state = posted`, counted by commercial partner, then the counting rules below |
| `engagements` | `sale.order` | `state = sale`, partner is one of the counted clients |
| `hours` | `account.analytic.line` | has a project, line partner is one of the counted clients, `0 < unit_amount <= 12` |
| `hoursFloor` | derived | `hours` floored to the hundred |
| `team` | `account.analytic.line` | distinct employees on the lines counted in `hours` |
| `projects` | `project.project` | `partner_id` is one of the counted clients (archived projects included) |
| `tasksDone` | `project.task` | on those projects, `state = 1_done` |

## Counting rules for `clients`

1. Start from every commercial partner with at least one posted customer invoice.
2. Leave out a partner whose only invoices are commissions rather than a service delivered.
3. Leave out partners invoiced only for items that are not a professional service.
4. Related companies count once. Partner records with near-identical names count as one until
   they are confirmed to be separate legal entities.
5. Related parties are not counted.

## Rules for every figure

- Published figures are floored, never rounded up.
- Timesheet lines outside 0 to 12 hours are left out (bulk and correcting entries).
- A figure with no system of record behind it is not published.
- `npm run check` gates the facts file: whole, positive, dated, hours floored, read by both
  content files.
