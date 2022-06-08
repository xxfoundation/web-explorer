CREATE
OR REPLACE VIEW "public"."new_accounts" AS WITH highest_block AS (
    SELECT
        b_1.block_number,
        to_timestamp(((b_1."timestamp" / 1000)) :: double precision) AS "timestamp"
    FROM
        block b_1
    WHERE
        (
            b_1.block_number = (
                SELECT
                    max(block.block_number) AS max
                FROM
                    block
            )
        )
),
days_relatieve_from_heighest_block AS (
    SELECT
        b_1.block_number,
        to_timestamp(((b_1."timestamp" / 1000)) :: double precision) AS to_timestamp
    FROM
        block b_1
    WHERE
        (
            to_timestamp(((b_1."timestamp" / 1000)) :: double precision) >= (
                (
                    SELECT
                        highest_block."timestamp"
                    FROM
                        highest_block
                ) - '30 days' :: INTERVAL
            )
        )
    LIMIT
        1
)
SELECT
    count(a.account_id) AS accounts,
    b.active_era AS era
FROM
    (
        account a
        JOIN block b ON ((b.block_number = a.block_height))
    )
WHERE
    (
        a.block_height >= (
            SELECT
                days_relatieve_from_heighest_block.block_number
            FROM
                days_relatieve_from_heighest_block
        )
    )
GROUP BY
    b.active_era;