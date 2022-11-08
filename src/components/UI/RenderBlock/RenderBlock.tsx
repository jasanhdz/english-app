import { Block } from '@/interfaces/notion';
import { getTextBlock, getListItem } from '@/utils/getTextBlock';
import { VideoBlock } from './VideoBlock';

interface Props {
    index: number
    block: Block
    blocks: Block[]
}

export function RenderBlock({ index, block, blocks }: Props) {
    switch (block?.type) {
        case 'paragraph':
            return <p className='mb-1' dangerouslySetInnerHTML={{ __html: getTextBlock(block) }}></p>
        case 'heading_1':
            return <h1 className='mb-4 text-3xl' dangerouslySetInnerHTML={{ __html: getTextBlock(block) }}></h1>
        case 'heading_2':
            return <h2 className='mb-3 font-bold text-2xl' dangerouslySetInnerHTML={{ __html: getTextBlock(block) }}></h2>
        case 'heading_3':
            return <h3 className='mb-2 font-bold text-lg' dangerouslySetInnerHTML={{ __html: getTextBlock(block) }}></h3>
        case 'bulleted_list_item':
            return <li dangerouslySetInnerHTML={{ __html: getTextBlock(block) }}></li>
        case 'numbered_list_item':
            const prev = blocks[index - 1] ?? null
            if (prev === null || prev && prev.type !== block.type) {
                const list = getListItem(index, block.type, blocks)
                return (
                    <ol className='list-decimal list-inside'>
                        {list.map((item) => <li key={item.id} dangerouslySetInnerHTML={{ __html: getTextBlock(item) }}></li>)}
                    </ol>
                )
            }
            return <></>
        case 'divider':
            return <hr className='border-gray-200 mb-3' />
        case 'video':
            return <VideoBlock block={block} />
        case 'image':
            return <img className='w-full' src={block?.image?.external?.url} alt={block.id} />
        default:
            return <></>
    }
}