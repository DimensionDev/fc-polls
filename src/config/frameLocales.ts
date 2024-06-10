import { LOCALE } from '@/constants/enum';

/**
 * It wont work in react, just work in jsx render
 * especially for frame image text and button text
 */
export const locales: Record<LOCALE, Record<string, string>> = {
    [LOCALE.EN]: {
        'No poll found via pollId="_"': 'No poll found via pollId="{0}"',
        'Invalid signature message': 'Invalid signature message',
        'Back to poll': 'Back to poll',
        'Not supported frame client protocol: _': 'Not supported frame client protocol: {0}',
        'Invalid parameters: profileId=_, buttonIndex=_': 'Invalid parameters: profileId={0}, buttonIndex={1}',
        'Invalid pollId: _': 'Invalid pollId: {0}',
        'Poll is expired': 'Poll is expired',
        'You have voted _ time_, cannot vote again': 'You have voted {0} time{1}, cannot vote again',
        'View Results': 'View Results',
        'Vote failed': 'Vote failed',
        'Invalid action: buttonIndex=_': 'Invalid action: buttonIndex={0}',
        'Invalid vote choice': 'Invalid vote choice',
        'You have already voted for this choice': 'You have already voted for this choice',
        'No poll found': 'No poll found',
        'No profile found': 'No profile found',
        Expired: 'Expired',
        '_ day_ left': '{0} day{1} left',
        '_ hour_ left': '{0} hour{1} left',
    },
    [LOCALE.ZH]: {
        'No poll found via pollId="_"': '通过pollId="{0}"找不到投票',
        'Invalid signature message': '无效的签名消息',
        'Back to poll': '返回投票',
        'Not supported frame client protocol: _': '不支持的frame客户端协议: {0}',
        'Invalid parameters: profileId=_, buttonIndex=_': '无效的参数: profileId={0}, buttonIndex={1}',
        'Invalid pollId: _': '无效的投票ID: {0}',
        'Poll is expired': '投票已过期',
        'You have voted _ time_, cannot vote again': '您已投票{0}次，不能再次投票',
        'View Results': '查看结果',
        'Vote failed': '投票失败',
        'Invalid action: buttonIndex=_': '无效操作: buttonIndex={0}',
        'Invalid vote choice': '无效的投票选项',
        'You have already voted for this choice': '您已经投票给这个选项了',
        'No poll found': '找不到投票',
        'No profile found': '找不到用户',
        Expired: '已过期',
        '_ day_ left': '剩余{0}天',
        '_ hour_ left': '剩余{0}小时',
    },
};
