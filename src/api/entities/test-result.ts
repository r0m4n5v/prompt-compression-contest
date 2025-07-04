import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Attempt } from './attempt.js';
import { Test } from './test.js';

@Entity({ name: 'test_result' })
export class TestResult {
  @PrimaryColumn({ type: 'integer', name: 'attempt_id' })
  attemptId!: number;

  @PrimaryColumn({ type: 'integer', name: 'test_id' })
  testId!: number;

  @Column({ type: 'boolean', nullable: true })
  is_valid?: boolean;

  @Column({ type: 'text', nullable: true })
  compressed_prompt?: string;

  @Column({ type: 'float', nullable: true })
  compression_ratio?: number;

  @ManyToOne('Attempt', (attempt: Attempt) => attempt.testResults, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'attempt_id', referencedColumnName: 'id' })
  attempt!: Attempt;

  @ManyToOne(() => Test, test => test.testResults, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'test_id', referencedColumnName: 'id' })
  test!: Test;
}
