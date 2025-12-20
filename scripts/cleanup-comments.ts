import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const orderIdPrefix = 'cmj9978j'

    // Find orders starting with this prefix
    const orders = await prisma.order.findMany({
        where: {
            id: {
                startsWith: orderIdPrefix
            }
        },
        select: { id: true }
    })

    if (orders.length === 0) {
        console.log(`No order found with ID starting with ${orderIdPrefix}`)
        return
    }

    const fullOrderId = orders[0].id
    console.log(`Found order: ${fullOrderId}`)

    // Find system comments (status updates)
    const systemComments = await prisma.comment.findMany({
        where: {
            orderId: fullOrderId,
            isSystem: true
        }
    })

    console.log(`Found ${systemComments.length} system comments.`)

    if (systemComments.length > 0) {
        const deleted = await prisma.comment.deleteMany({
            where: {
                orderId: fullOrderId,
                isSystem: true
            }
        })
        console.log(`Deleted ${deleted.count} status updates.`)
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
