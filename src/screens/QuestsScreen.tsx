import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  icon: string;
  type: 'daily' | 'weekly' | 'special';
  completed: boolean;
}

const QUESTS: Quest[] = [
  { id: 'd1', title: 'GM Check-in', description: 'Pay 5 SKR to validate your daily GM', xp: 10, icon: '☀️', type: 'daily', completed: false },
  { id: 'd2', title: 'Swipe Session', description: 'Swipe through 5 projects today', xp: 10, icon: '👆', type: 'daily', completed: false },
  { id: 'd3', title: 'Save a Project', description: 'Save at least 1 project today', xp: 10, icon: '🔖', type: 'daily', completed: false },
  { id: 'd4', title: 'Solana Runner', description: 'Score 30+ in Solana Runner', xp: 15, icon: '🏃', type: 'daily', completed: false },
  { id: 'd5', title: 'Daily SKR Stake', description: 'Stake minimum 20 SKR today', xp: 25, icon: '💎', type: 'daily', completed: false },
  { id: 'd6', title: 'Daily SOL Stake', description: 'Stake SOL with a validator of your choice', xp: 20, icon: '🪙', type: 'daily', completed: false },
  { id: 'd7', title: 'Daily Swap', description: 'Make a swap on a native Seeker dApp', xp: 15, icon: '🔄', type: 'daily', completed: false },

  { id: 'w1', title: 'Full Sweep', description: 'Complete ALL daily quests every day for 7 days', xp: 300, icon: '⚡', type: 'weekly', completed: false },
  { id: 'w2', title: '7-Day GM Streak', description: 'Maintain a 7-day GM streak', xp: 200, icon: '🔥', type: 'weekly', completed: false },
  { id: 'w3', title: 'High Scorer', description: 'Score 200+ in Solana Runner this week', xp: 150, icon: '🎮', type: 'weekly', completed: false },
  { id: 'w4', title: 'Weekly SKR Staker', description: 'Stake SKR at least once this week', xp: 200, icon: '💎', type: 'weekly', completed: false },
  { id: 'w5', title: 'Weekly SOL Staker', description: 'Stake SOL every day for 7 days', xp: 250, icon: '🪙', type: 'weekly', completed: false },
  { id: 'w6', title: 'Swap Master', description: 'Complete a daily swap for 7 days straight', xp: 200, icon: '🔄', type: 'weekly', completed: false },
  { id: 'w7', title: 'SKR Believer', description: 'Stake 140+ SKR total this week', xp: 350, icon: '🚀', type: 'weekly', completed: false },

  { id: 's1', title: 'Connect Wallet', description: 'Link your Solana wallet to SolQuest', xp: 500, icon: '🔗', type: 'special', completed: false },
  { id: 's2', title: 'SKR Diamond Hands', description: 'Stake $100+ worth of SKR', xp: 2000, icon: '💎', type: 'special', completed: false },
  { id: 's3', title: 'Rate SolQuest', description: 'Leave a review on the Solana dApp Store', xp: 300, icon: '⭐', type: 'special', completed: false },
  { id: 's4', title: 'Explorer', description: 'Review every project in SolQuest', xp: 250, icon: '🏆', type: 'special', completed: false },
  { id: 's5', title: 'SOL Validator OG', description: 'Stake minimum 2 SOL with the official Solana validator', xp: 1500, icon: '🏛️', type: 'special', completed: false },
];

const XP_PER_LEVEL = 800;

export default function QuestsScreen() {
  const [quests, setQuests] = useState(QUESTS);
  const [filter, setFilter] = useState<'daily' | 'weekly' | 'special'>('daily');

  const filtered = quests.filter(q => q.type === filter);
  const completedCount = quests.filter(q => q.type === filter && q.completed).length;
  const totalCount = filtered.length;
  const totalXP = quests.filter(q => q.completed).reduce((sum, q) => sum + q.xp, 0);
  const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  const xpInLevel = totalXP % XP_PER_LEVEL;

  const toggleQuest = (id: string) => {
    setQuests(prev => prev.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
  };

  const getTypeLabel = () => {
    if (filter === 'daily') return 'Resets every day';
    if (filter === 'weekly') return 'Resets every Monday';
    return 'One-time rewards';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quests</Text>

      <View style={styles.levelRow}>
        <View style={styles.levelLeft}>
          <Text style={styles.levelText}>Level {level}</Text>
          <View style={styles.levelBar}>
            <View style={[styles.levelFill, { width: `${(xpInLevel / XP_PER_LEVEL) * 100}%` }]} />
          </View>
          <Text style={styles.levelXP}>{xpInLevel}/{XP_PER_LEVEL} XP to next level</Text>
        </View>
        <View style={styles.totalXPBox}>
          <Text style={styles.totalXPNumber}>{totalXP}</Text>
          <Text style={styles.totalXPLabel}>Total XP</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setFilter('daily')} style={[styles.tab, filter === 'daily' && styles.tabActive]}>
          <Text style={[styles.tabText, filter === 'daily' && styles.tabTextActive]}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('weekly')} style={[styles.tab, filter === 'weekly' && styles.tabActive]}>
          <Text style={[styles.tabText, filter === 'weekly' && styles.tabTextActive]}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('special')} style={[styles.tab, filter === 'special' && styles.tabActive]}>
          <Text style={[styles.tabText, filter === 'special' && styles.tabTextActive]}>Special</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }]} />
        </View>
        <Text style={styles.progressText}>{completedCount}/{totalCount}</Text>
      </View>
      <Text style={styles.typeLabel}>{getTypeLabel()}</Text>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.map(quest => (
          <TouchableOpacity
            key={quest.id}
            style={[styles.questCard, quest.completed && styles.questDone]}
            onPress={() => toggleQuest(quest.id)}
            activeOpacity={0.7}
          >
            <View style={styles.questLeft}>
              <View style={[styles.questIconBox, quest.completed && styles.questIconBoxDone]}>
                <Text style={styles.questIcon}>{quest.completed ? '✓' : quest.icon}</Text>
              </View>
              <View style={styles.questInfo}>
                <Text style={[styles.questTitle, quest.completed && styles.questTitleDone]}>{quest.title}</Text>
                <Text style={styles.questDesc}>{quest.description}</Text>
              </View>
            </View>
            <View style={[styles.xpBadge, quest.completed && styles.xpBadgeDone]}>
              <Text style={[styles.questXP, quest.completed && styles.questXPDone]}>+{quest.xp}</Text>
              <Text style={[styles.questXPLabel, quest.completed && styles.questXPDone]}>XP</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a', paddingTop: 60 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 12 },
  levelRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
    gap: 12,
  },
  levelLeft: { flex: 1 },
  levelText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  levelBar: {
    height: 8,
    backgroundColor: '#1a1a2e',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  levelFill: {
    height: '100%',
    backgroundColor: '#9945FF',
    borderRadius: 4,
  },
  levelXP: { color: '#888', fontSize: 11 },
  totalXPBox: {
    backgroundColor: '#9945FF15',
    borderWidth: 1,
    borderColor: '#9945FF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 70,
  },
  totalXPNumber: { color: '#9945FF', fontSize: 22, fontWeight: 'bold' },
  totalXPLabel: { color: '#888', fontSize: 10, marginTop: 2 },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  tabActive: {
    backgroundColor: '#9945FF22',
    borderColor: '#9945FF',
  },
  tabText: { color: '#888', fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: '#9945FF' },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 4,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#1a1a2e',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9945FF',
    borderRadius: 3,
  },
  progressText: { color: '#888', fontSize: 12 },
  typeLabel: { color: '#666', fontSize: 11, paddingHorizontal: 20, marginBottom: 10 },
  list: { paddingHorizontal: 16 },
  questCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  questDone: {
    borderColor: '#9945FF44',
    backgroundColor: '#9945FF08',
  },
  questLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  questIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#0f0f1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  questIconBoxDone: {
    backgroundColor: '#9945FF22',
  },
  questIcon: { fontSize: 20 },
  questInfo: { flex: 1 },
  questTitle: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  questTitleDone: { color: '#9945FF' },
  questDesc: { color: '#888', fontSize: 11, marginTop: 2 },
  xpBadge: {
    backgroundColor: '#0f0f1a',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    marginLeft: 8,
  },
  xpBadgeDone: {
    backgroundColor: '#9945FF22',
  },
  questXP: { color: '#666', fontSize: 14, fontWeight: 'bold' },
  questXPLabel: { color: '#666', fontSize: 9 },
  questXPDone: { color: '#9945FF' },
});
